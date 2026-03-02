'use client';

import { useEffect } from 'react';
import HabitItem from './HabitItem';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchHabits } from '../store/habitsSlice';

export default function HabitList() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.habits);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  if (loading) return <div>Cargando hábitos...</div>;
  if (error) return <div style={{ color: 'crimson' }}>Error: {error}</div>;
  if (!items.length) return <div>No hay hábitos aún.</div>;

  return (
    <ul style={{ display: 'grid', gap: 8, padding: 0, listStyle: 'none' }}>
      {items.map((h) => (
        <HabitItem key={h._id} habit={h} />
      ))}
    </ul>
  );
}