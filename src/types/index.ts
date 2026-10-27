export type UserRole = 'PERSONAL' | 'MANAGEMENT' | 'ADMINISTRATOR' | 'ADMIN' | 'BOARD' | 'CEO' | 'VORSTAND';

export interface User {
  id: string;
  username: string;
  displayName: string;
  email?: string;
  role: UserRole;
  roleLabel: string;
  unitId?: string;
  unitName?: string;
  activityEligible: boolean;
  isShiftHost: boolean;
  accountStatus: 'active' | 'disabled';
  createdAt: string;
  mustChangePassword?: boolean;
}

export interface Shift {
  id: string;
  title: string;
  description?: string;
  scheduledStart: string;
  scheduledEnd: string;
  status: 'planned' | 'open' | 'running' | 'completed' | 'cancelled';
  shiftType: string;
  unitId?: string;
  unitName?: string;
  hostUserId?: string;
  hostName?: string;
  maxParticipants?: number;
  participantCount: number;
  activityEligible: boolean;
  remarks?: string;
  performanceScore?: number;
  createdAt: string;
}

export interface Participation {
  id: string;
  shiftId: string;
  userId: string;
  userName: string;
  displayName: string;
  status: 'pending' | 'confirmed' | 'completed';
  actualCheckIn?: string;
  actualCheckOut?: string;
  actualDurationMinutes?: number;
  creditedDurationMinutes?: number;
}

export interface Activity {
  userId: string;
  displayName: string;
  unitName: string;
  creditedMinutes: number;
  targetMinutes: number;
  qualifyingShiftCount: number;
  missingTargetMinutes: number;
  targetStatus: 'met' | 'warning' | 'missed';
  lastParticipationAt?: string;
}

export interface Fine {
  id: string;
  userId: string;
  displayName: string;
  reason: string;
  amount: number;
  status: 'open' | 'paid' | 'cancelled';
  issuedAt: string;
  issuedBy: string;
}
