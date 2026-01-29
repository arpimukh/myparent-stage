// app/api/claim-job/route.js
export async function PATCH(req) {
  const { jobId, vendorId } = await req.json();

  // ATOMIC SQL: Only 1 vendor can affect 1 row
  const query = `
    UPDATE service_requests 
    SET vendor_id = ?, status = 'assigned' 
    WHERE id = ? AND status = 'open'
  `;

  const [result] = await mysqlDb.query(query, [vendorId, jobId]);

  if (result.affectedRows === 1) {
    // SUCCESS: Notify Kafka that the job is closed
    await sendToKafka('job-status-updates', { jobId, status: 'assigned' });
    return Response.json({ success: true });
  } else {
    // FAIL: Row was already updated by another vendor
    return Response.json({ error: "Job already claimed" }, { status: 409 });
  }
}