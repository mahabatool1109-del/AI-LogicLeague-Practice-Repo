const vendors = require('../models/vendorData');
const attendanceRecords = require('../models/attendanceData');

// Get all vendors
const getAllVendors = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: vendors.length,
      data: vendors
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get vendor by ID
const getVendorById = (req, res) => {
  try {
    const { id } = req.params;
    const vendor = vendors.find(v => v.id === id);

    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    res.status(200).json({ success: true, data: vendor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get vendor attendance
const getVendorAttendance = (req, res) => {
  try {
    const { id } = req.params;
    const vendorAttendance = attendanceRecords.filter(record =>
      record.userId === id && record.userType === 'vendor'
    );

    res.status(200).json({
      success: true,
      count: vendorAttendance.length,
      data: vendorAttendance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Check in vendor
const checkInVendor = (req, res) => {
  try {
    const { vendorId, purpose, location } = req.body;

    if (!vendorId || !purpose || !location) {
      return res.status(400).json({ error: 'Vendor ID, purpose, and location are required' });
    }

    const vendor = vendors.find(v => v.id === vendorId);
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    // Check if already checked in today
    const today = new Date().toISOString().split('T')[0];
    const existingRecord = attendanceRecords.find(record =>
      record.userId === vendorId &&
      record.checkInTime.startsWith(today) &&
      record.status === 'active'
    );

    if (existingRecord) {
      return res.status(400).json({ error: 'Vendor already checked in today' });
    }

    const newAttendance = {
      id: `att-${Date.now()}`,
      userId: vendorId,
      userType: 'vendor',
      userName: vendor.contactPerson,
      company: vendor.company,
      checkInTime: new Date().toISOString(),
      checkOutTime: null,
      location: location,
      status: 'active',
      purpose: purpose
    };

    attendanceRecords.push(newAttendance);

    res.status(201).json({
      success: true,
      message: 'Vendor checked in successfully',
      data: newAttendance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Check out vendor
const checkOutVendor = (req, res) => {
  try {
    const { vendorId } = req.body;

    if (!vendorId) {
      return res.status(400).json({ error: 'Vendor ID is required' });
    }

    const activeRecord = attendanceRecords.find(record =>
      record.userId === vendorId &&
      record.userType === 'vendor' &&
      record.status === 'active'
    );

    if (!activeRecord) {
      return res.status(404).json({ error: 'No active check-in found for this vendor' });
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
      message: 'Vendor checked out successfully',
      data: activeRecord
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllVendors,
  getVendorById,
  getVendorAttendance,
  checkInVendor,
  checkOutVendor
};