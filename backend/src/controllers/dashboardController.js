//import { NextResponse } from 'next/server';
//import { NextRequest } from 'next/request';
const { pool } = require('../config/database')

const dashboardController = {
  // Get daughter dashboard data
  async getDaughterDashboard(req, res) {
    try {
      const { id } = req.params
      
      // Get daughter profile
      const [daughterData] = await pool.execute(
        'SELECT * FROM users WHERE id = ? AND role = "daughter"',
        [id]
      )
      
      if (daughterData.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Daughter not found'
        })
      }
      
      // Get parents associated with this daughter
      const [parentsData] = await pool.execute(
        `SELECT  p.user_id as clientId,p.name as clientName, p.phone as contactNo,IFNULL(c1.count,0) as activeService,
      p.medical_conditions as notes, p.address from 
      ( SELECT c.client_id, count(1) as count FROM parent_care_services.client_services c 
        WHERE  c.daughter_id = ? GROUP BY c.client_id) as c1 right outer join parent_care_services.parents p
          on p.user_id=c1.client_id where p.daughter_id=? LIMIT 5
       `, [id])
        //'SELECT u.*, p.medical_conditions, p.emergency_contact FROM users u , parents p WHERE u.daughter_id = p.user_id', 
         //[id])
      
      res.json({
        success: true,
        data: {
          daughter: daughterData[0],
          parents: parentsData
        }
      })
      
    } catch (error) {
      console.error('Get daughter dashboard error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to fetch dashboard data'
      })
    }
  },

  // Get all vendors
  async getAllVendors(req, res) {
    try {
      const [vendors] = await pool.execute(`
        SELECT u.*, v.business_name, v.services, v.service_description 
        FROM users u 
        LEFT JOIN vendors v ON u.id = v.user_id 
        WHERE u.role = "vendor" AND u.status = "approved"
      `)
      
      res.json({
        success: true,
        data: vendors
      })
      
    } catch (error) {
      console.error('Get vendors error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to fetch vendors'
      })
    }
  },
  
  // Update service status
  /* Create new service 
    URL: http://localhost:5001/api/services/service/DRV
    PAYLOAD: {"client_id": "3", "vendor_id": "2", "daughter_id": "22", "status":"open", "booking_date":"21/01/26",
        "special_insturctions":"","service_charge":800, "review":"","created_at":"19/01/26","updated_at":"19/01/26", "service_location":"kolkata"
           } */
  createService: async (req, res) =>{
    try {
      const { typeCode } = req.params
      console.log(`Creating service of type: ${typeCode}`)
      const serviceData = req.body
      // module.exports = {
      //   SERVICE_TYPES,
      //   SERVICE_STATUS,
      //   SERVICE_TYPE_CODE, 
      //   SERVICE_TYPE_MAPPING
      // };
      console.log('Service Data:',  [ serviceData.client_id, serviceData.vendor_id, serviceData.daughter_id, serviceData.status, serviceData.booking_date,
            serviceData.special_insturctions,serviceData.service_charge, serviceData.review,serviceData.created_at,serviceData.updated_at, typeCode, serviceData.service_location]);
      const [result]=await pool.execute(
          `INSERT INTO parent_care_services.client_services ( client_id, vendor_id, daughter_id, status, booking_date,special_instructions,
          service_charge, review,created_at, updated_at,service_type, service_location) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [ serviceData.client_id, serviceData.vendor_id, serviceData.daughter_id, serviceData.status, serviceData.booking_date,
            serviceData.special_insturctions,serviceData.service_charge, serviceData.review,serviceData.created_at,serviceData.updated_at, typeCode, serviceData.service_location]
        );
      const newRequestId = result.insertId;
      console.log(`New service request created with ID: ${newRequestId}`);

     } catch (error) {
          return res.status(400).json({ error: "Failed to create service" });
      }
        return res.json({ success: true, message: 'Service created successfully' });
  },

  updateService: async (req, res) =>{
    try {
      const { typeCode } = req.params
      console.log(`Creating service of type: ${typeCode}`)
      const serviceData = req.body
      //booking_date,serviceData.service_charge, 
      console.log('Service Data:',  [ serviceData.client_id, serviceData.vendor_id, serviceData.daughter_id, serviceData.status, serviceData.booking_date,
            serviceData.special_insturctions,serviceData.service_charge, serviceData.review,serviceData.created_at,serviceData.updated_at, typeCode, serviceData.service_location]);
      await pool.execute(
          `UPDATE parent_care_services.client_services SET vendor_id=?, daughter_id=?, status=?, special_instructions =?,
           review=?,updated_at=? WHERE id=?`,
          [  serviceData.vendor_id, serviceData.daughter_id, serviceData.status,  serviceData.special_insturctions,
            serviceData.review,serviceData.created_at,serviceData.updated_at, serviceData.id]
        );
     } catch (error) {
          return res.status(400).json({ error: "Failed to update service" });
      }
        return res.json({ success: true, message: 'Service updated successfully' });
  },

  updateServiceReview: async (req, res) =>{
    try {
      const { id } = req.params
      console.log(`update service of id: ${id}`)
      const serviceData = req.body
      //booking_date,serviceData.service_charge, 
      console.log('Service Data:',  [ serviceData.rating, id]);
      await pool.execute(
          `UPDATE parent_care_services.client_services SET rating=? WHERE id=?`,
          [  serviceData.rating, id]
        );
     } catch (error) {
          return res.status(400).json({ error: "Failed to update service" });
      }
        return res.json({ success: true, message: 'Service rated successfully' });
  },
  updateServiceDate_Charge: async (req, res) =>{
    try {
      const { typeCode } = req.params
      console.log(`Creating service of type: ${typeCode}`)
      const serviceData = req.body
      //booking_date,serviceData.service_charge, 
      console.log('Service Data:',  [ serviceData.client_id, serviceData.vendor_id, serviceData.daughter_id, serviceData.status, serviceData.booking_date,
            serviceData.special_insturctions,serviceData.service_charge, serviceData.review,serviceData.created_at,serviceData.updated_at, typeCode, serviceData.service_location]);
      await pool.execute(
          `UPDATE parent_care_services.client_services SET booking_date=?, service_charge=? where id=?`,
          [  serviceData.booking_date, serviceData.service_charge,  serviceData.id]
        );
     } catch (error) {
          return res.status(400).json({ error: "Failed to update service" });
      }
        return res.json({ success: true, message: 'Service updated successfully' });
  },

  // Update service status
  updateServiceStatus: async (req, res) => {
 
    try {
      const { id } = req.params
      const { action,  vendor_id} = req.body
      //const { action } = serviceData.action
     // const { vendor_id } = serviceData.vendor_id
      console.log(`updateServiceStatus ${id} action: ${action} vendor_id: ${vendor_id} `);
      
      // This would update a services table when you implement service management
     
      // 1. Logic to connect to your Database (Prisma, MongoDB, etc.)
      // 2. Perform the update based on the action
    
        if (action === 'escalated') {
          console.log(`Request ${id} escalated to management.`);
            await pool.execute(
            `UPDATE parent_care_services.client_services SET status = 'escalated', escaleted_to = 'customar_care_lavel1@livingtrail.com' WHERE id = ?`,
            [ id])
        } else if (action === 'cancelled'|| action === 'open'|| action === 'reopened'|| action === 'close'|| action === 'pending') {
          console.log(`Service Request ${id} has been updated to ${action}.`);
            await pool.execute(`UPDATE parent_care_services.client_services
               SET status = ? WHERE id = ?`, [action,id] );
        } else if (action === 'assigned') {
          console.log(`Request ${id} has been assigned.`);
            await pool.execute(`UPDATE parent_care_services.client_services
               SET status = "assigned", vendor_id = ? WHERE id = ?`, [vendor_id,id] );
        } 
         else {
          res.status(400).json({ error: "Invalid action" })
        }

        return res.json({ message: `Successfully updated service status to: ${action}` });
    } catch (error) {
      console.log(`Update service status error: ${error}`);
      return res.status(500).json({ error: "Failed to update request" });
    }     
  }
}

module.exports = dashboardController