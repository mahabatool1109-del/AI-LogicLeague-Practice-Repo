const attendanceRecords = require('../models/attendanceData');

// Get all attendance records
const getAllAttendance = (req, res) => {
  try {
    const { userType, date, status } = req.query;
    let filteredRecords = attendanceRecords;

    if (userType) {
      filteredRecords = filteredRecords.filter(record => record.userType === userType);
    }

    if (date) {
      filteredRecords = filteredRecords.filter(record =>
        record.checkInTime.startsWith(date)
      );
    }

    if (status) {
      filteredRecords = filteredRecords.filter(record => record.status === status);
    }

    // Sort by check-in time (most recent first)
    filteredRecords.sort((a, b) => new Date(b.checkInTime) - new Date(a.checkInTime));

    res.status(200).json({
      success: true,
      count: filteredRecords.length,
      data: filteredRecords
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get attendance by ID
const getAttendanceById = (req, res) => {
  try {
    const { id } = req.params;
    const record = attendanceRecords.find(r => r.id === id);

    if (!record) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get attendance statistics
const getAttendanceStats = (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const todayRecords = attendanceRecords.filter(record =>
      record.checkInTime.startsWith(today)
    );

    const stats = {
      totalToday: todayRecords.length,
      staffToday: todayRecords.filter(r => r.userType === 'staff').length,
      vendorsToday: todayRecords.filter(r => r.userType === 'vendor').length,
      visitorsToday: todayRecords.filter(r => r.userType === 'visitor').length,
      activeNow: attendanceRecords.filter(r => r.status === 'active').length,
      completedToday: todayRecords.filter(r => r.status === 'completed').length
    };

    res.status(200).json({
      success: true,
      date: today,
      data: stats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get current active attendance
const getActiveAttendance = (req, res) => {
  try {
    const activeRecords = attendanceRecords.filter(record => record.status === 'active');

    res.status(200).json({
      success: true,
      count: activeRecords.length,
      data: activeRecords
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get attendance by date range
const getAttendanceByDateRange = (req, res) => {
  try {
    const { startDate, endDate, userType } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }

    let filteredRecords = attendanceRecords.filter(record => {
      const recordDate = record.checkInTime.split('T')[0];
      return recordDate >= startDate && recordDate <= endDate;
    });

    if (userType) {
      filteredRecords = filteredRecords.filter(record => record.userType === userType);
    }

    // Group by date
    const groupedByDate = filteredRecords.reduce((acc, record) => {
      const date = record.checkInTime.split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(record);
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      dateRange: { startDate, endDate },
      data: groupedByDate
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAttendance,
  getAttendanceById,
  getAttendanceStats,
  getActiveAttendance,
  getAttendanceByDateRange
};