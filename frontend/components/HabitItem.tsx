import { Habit } from '../store/habitsSlice';

export default function HabitItem({ habit }: { habit: Habit }) {
  const color =
    habit.streak >= 44 ? 'green' : habit.streak >= 22 ? 'orange' : 'red';

  return (
    <li
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        padding: 12,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#fff',
      }}
    >
      <div>
        <div style={{ fontWeight: 600 }}>{habit.name}</div>
        {habit.description && (
          <div style={{ fontSize: 12, color: '#666' }}>{habit.description}</div>
        )}
      </div>
      <div style={{ fontSize: 12 }}>
        Racha: <span style={{ color }}>{habit.streak}/66</span>
      </div>
    </li>
  );
}
