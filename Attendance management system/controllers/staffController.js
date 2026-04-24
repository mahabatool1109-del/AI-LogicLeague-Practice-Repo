const staff = require('../models/staffData');
const attendanceRecords = require('../models/attendanceData');

// Get all staff
const getAllStaff = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: staff.length,
      data: staff
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get staff by ID
const getStaffById = (req, res) => {
  try {
    const { id } = req.params;
    const staffMember = staff.find(s => s.id === id);

    if (!staffMember) {
      return res.status(404).json({ error: 'Staff member not found' });
    }

    res.status(200).json({ success: true, data: staffMember });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get staff attendance
const getStaffAttendance = (req, res) => {
  try {
    const { id } = req.params;
    const staffAttendance = attendanceRecords.filter(record =>
      record.userId === id && record.userType === 'staff'
    );

    res.status(200).json({
      success: true,
      count: staffAttendance.length,
      data: staffAttendance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Check in staff
const checkInStaff = (req, res) => {
  try {
    const { staffId, location } = req.body;

    if (!staffId || !location) {
      return res.status(400).json({ error: 'Staff ID and location are required' });
    }

    const staffMember = staff.find(s => s.id === staffId);
    if (!staffMember) {
      return res.status(404).json({ error: 'Staff member not found' });
    }

    // Check if already checked in today
    const today = new Date().toISOString().split('T')[0];
    const existingRecord = attendanceRecords.find(record =>
      record.userId === staffId &&
      record.checkInTime.startsWith(today) &&
      record.status === 'active'
    );

    if (existingRecord) {
      return res.status(400).json({ error: 'Staff member already checked in today' });
    }

    const newAttendance = {
      id: `att-${Date.now()}`,
      userId: staffId,
      userType: 'staff',
      userName: staffMember.name,
      department: staffMember.department,
      checkInTime: new Date().toISOString(),
      checkOutTime: null,
      location: location,
      status: 'active'
    };

    attendanceRecords.push(newAttendance);

    res.status(201).json({
      success: true,
      message: 'Staff checked in successfully',
      data: newAttendance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Check out staff
const checkOutStaff = (req, res) => {
  try {
    const { staffId } = req.body;

    if (!staffId) {
      return res.status(400).json({ error: 'Staff ID is required' });
    }

    const activeRecord = attendanceRecords.find(record =>
      record.userId === staffId &&
      record.userType === 'staff' &&
      record.status === 'active'
    );

    if (!activeRecord) {
      return res.status(404).json({ error: 'No active check-in found for this staff member' });
    }

    activeRecord.checkOutTime = new Date().toISOString();
    activeRecord.status = 'completed';

    // Calculate total hours
    const checkIn = new Date(activeRecord.checkInTime);
    const checkOut = new Date(activeRecord.checkOutTime);
    const totalHours = (checkOut - checkIn) / (1000 * 60 * 60);
    activeRecord.totalHours = Math.round(totalHours * 10) / 10;

    res.status(200).json({
      success: true,
      message: 'Staff checked out successfully',
      data: activeRecord
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllStaff,
  getStaffById,
  getStaffAttendance,
  checkInStaff,
  checkOutStaff
};