const { pool } = require('../config/database')

const parentDashboardController = {
  // Get daughter dashboard data
  async getParentDashboard(req, res) {
    try {
      const { id } = req.params
      
      // Get daughter profile
      const [parentData] = await pool.execute(
        'SELECT * from (select p.*,d.name as daughter_name, d.contact_no daughter_phone FROM parent_care_services.parents p  left outer join parent_care_services.daughters d on p.daughter_id=d.id ) t where t.user_id = ?',
        [id]
      )
      
      if (parentData.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Parent not found'
        })
      }
      
      // Get parents associated with this daughter
      const [serviceData] = await pool.execute(
        `SELECT  c.id, v.business_name as vendor_name, v.id, v.contact_no as vendor_contact_no, v.is_verified, 
v.service_description, v.rating, c. booking_date, c.special_instructions, c.service_charge, c.created_at,c.updated_at,
 c.escaleted_to,c.service_type,c.review,c.status FROM parent_care_services.client_services c inner join
 parent_care_services.vendors v  on v.user_id=c.vendor_id where c.client_id = ? and status !='completed' and status!='closed' and status!= 'cancelled' order by created_at,booking_date desc`,[id]
      )

      const [closedServiceData] = await pool.execute(
        `SELECT  c.id, v.business_name as vendor_name, v.id as vendor_id, v.contact_no as vendor_contact_no, v.is_verified, 
v.service_description, c.rating, c. booking_date, c.special_instructions, c.service_charge, c.created_at,c.updated_at,
 c.escaleted_to,c.service_type,c.review,c.status FROM parent_care_services.client_services c inner join
 parent_care_services.vendors v  on v.user_id=c.vendor_id where c.client_id = ? and status ='completed' or status='closed' or status= 'cancelled' or status='closed' order by created_at,booking_date desc`,[id]
      )
      const [events] = await pool.execute(
        'SELECT id,title, description, venue, event_date FROM events WHERE event_date > CURDATE() ORDER BY event_date ASC'
      )
      
      
      res.json({
        success: true,
        data: {
          parent: parentData,
          serviceList: serviceData,
          closedServiceList: closedServiceData,
          events: events
        }
      })
      
    } catch (error) {
      console.error('Get parent dashboard error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to fetch dashboard data'
      })
    }
  },

  // Update service status
  async updateServiceStatus(req, res) {
    try {
      const { id } = req.params
      const { status } = req.body
      
      // This would update a services table when you implement service management
      res.json({
        success: true,
        message: 'Service status updated successfully'
      })
      
    } catch (error) {
      console.error('Update service status error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to update service status'
      })
    }
  }
}

module.exports = parentDashboardController