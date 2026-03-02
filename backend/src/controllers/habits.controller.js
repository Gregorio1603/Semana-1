import Habit from '../models/habit.js';

export async function createHabit(req, res) {
  try {
    const userId = req.header('x-user-id') || '000000000000000000000001';
    const { name, description, targetDays } = req.body;
    const habit = await Habit.create({ userId, name, description, targetDays });
    res.status(201).json(habit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function listHabits(req, res) {
  try {
    const userId = req.header('x-user-id') || '000000000000000000000001';
    const items = await Habit.find({ userId, isArchived: false }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getHabit(req, res) {
  try {
    const { id } = req.params;
    const habit = await Habit.findById(id);
    if (!habit) return res.status(404).json({ message: 'No encontrado' });
    res.json(habit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function updateHabit(req, res) {
  try {
    const { id } = req.params;
    const { name, description, targetDays, isArchived } = req.body;
    const habit = await Habit.findByIdAndUpdate(
      id,
      { $set: { name, description, targetDays, isArchived } },
      { new: true, runValidators: true }
    );
    if (!habit) return res.status(404).json({ message: 'No encontrado' });
    res.json(habit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function deleteHabit(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Habit.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Eliminado' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function completeHabit(req, res) {
  try {
    const { id } = req.params;
    const habit = await Habit.findById(id);
    if (!habit) return res.status(404).json({ message: 'No encontrado' });

    const now = new Date();
    const last = habit.lastCompletedAt ? new Date(habit.lastCompletedAt) : null;

    const sameDay =
      last &&
      last.getUTCFullYear() === now.getUTCFullYear() &&
      last.getUTCMonth() === now.getUTCMonth() &&
      last.getUTCDate() === now.getUTCDate();

    if (sameDay) {
      return res.json({ message: 'Ya marcado hoy', habit });
    }

    let newStreak = 1;
    if (last) {
      const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));
      newStreak = diffDays === 1 ? habit.streak + 1 : 1;
    }

    habit.streak = newStreak;
    habit.lastCompletedAt = now;
    await habit.save();

    res.json(habit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
