const visitors = require('../models/visitorData');
const attendanceRecords = require('../models/attendanceData');
const { v4: uuidv4 } = require('uuid');

// Get all visitors
const getAllVisitors = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: visitors.length,
      data: visitors
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get visitor by ID
const getVisitorById = (req, res) => {
  try {
    const { id } = req.params;
    const visitor = visitors.find(v => v.id === id);

    if (!visitor) {
      return res.status(404).json({ error: 'Visitor not found' });
    }

    res.status(200).json({ success: true, data: visitor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register and check in visitor
const checkInVisitor = (req, res) => {
  try {
    const { name, email, phone, company, purpose, hostName, location } = req.body;

    if (!name || !email || !purpose || !hostName || !location) {
      return res.status(400).json({
        error: 'Name, email, purpose, host name, and location are required'
      });
    }

    const visitorId = `visitor-${uuidv4()}`;

    const newVisitor = {
      id: visitorId,
      name: name,
      email: email,
      phone: phone || '',
      company: company || '',
      purpose: purpose,
      hostName: hostName,
      checkInTime: new Date().toISOString(),
      checkOutTime: null,
      status: 'checked-in'
    };

    visitors.push(newVisitor);

    // Create attendance record
    const newAttendance = {
      id: `att-${Date.now()}`,
      userId: visitorId,
      userType: 'visitor',
      userName: name,
      company: company || 'Individual',
      checkInTime: new Date().toISOString(),
      checkOutTime: null,
      location: location,
      status: 'active',
      hostName: hostName,
      purpose: purpose
    };

    attendanceRecords.push(newAttendance);

    res.status(201).json({
      success: true,
      message: 'Visitor checked in successfully',
      data: {
        visitor: newVisitor,
        attendance: newAttendance
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Check out visitor
const checkOutVisitor = (req, res) => {
  try {
    const { visitorId } = req.body;

    if (!visitorId) {
      return res.status(400).json({ error: 'Visitor ID is required' });
    }

    const visitor = visitors.find(v => v.id === visitorId);
    if (!visitor) {
      return res.status(404).json({ error: 'Visitor not found' });
    }

    if (visitor.status !== 'checked-in') {
      return res.status(400).json({ error: 'Visitor is not currently checked in' });
    }

    const activeRecord = attendanceRecords.find(record =>
      record.userId === visitorId &&
      record.userType === 'visitor' &&
      record.status === 'active'
    );

    visitor.checkOutTime = new Date().toISOString();
    visitor.status = 'checked-out';

    if (activeRecord) {
      activeRecord.checkOutTime = new Date().toISOString();
      activeRecord.status = 'completed';

      // Calculate total hours
      const checkIn = new Date(activeRecord.checkInTime);
      const checkOut = new Date(activeRecord.checkOutTime);
      const totalHours = (checkOut - checkIn) / (1000 * 60 * 60);
      activeRecord.totalHours = Math.round(totalHours * 10) / 10;
    }

    res.status(200).json({
      success: true,
      message: 'Visitor checked out successfully',
      data: {
        visitor: visitor,
        attendance: activeRecord
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get currently checked-in visitors
const getCheckedInVisitors = (req, res) => {
  try {
    const checkedInVisitors = visitors.filter(visitor => visitor.status === 'checked-in');

    res.status(200).json({
      success: true,
      count: checkedInVisitors.length,
      data: checkedInVisitors
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllVisitors,
  getVisitorById,
  checkInVisitor,
  checkOutVisitor,
  getCheckedInVisitors
};