'use client';

import HabitList from '../components/HabitList';

export default function HomePage() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: 16 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
        Hábitos (Semana 2)
      </h1>
      <p style={{ marginBottom: 16, color: '#555' }}>
        Lista cargada desde el backend con Redux.
      </p>
      <HabitList />
    </main>
  );
}