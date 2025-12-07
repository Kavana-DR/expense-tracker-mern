const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/expenses
// @desc    Add new expense
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { amount, category, date, note } = req.body;

    if (!amount || !category) {
      return res
        .status(400)
        .json({ message: 'Amount and category are required' });
    }

    const expense = await Expense.create({
      user: req.user._id,
      amount,
      category,
      date: date || new Date(),
      note,
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error('Add expense error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/expenses
// @desc    Get all expenses for logged-in user with optional filters
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;

    const query = { user: req.user._id };

    // date range filter
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    const expenses = await Expense.find(query).sort({ date: -1 });

    res.json(expenses);
  } catch (err) {
    console.error('Get expenses error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
