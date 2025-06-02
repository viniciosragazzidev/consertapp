export type UserRole = 'USER' | 'ADMIN';

export type OrganizationRole = 'OWNER' | 'ADMIN' | 'MANAGER' | 'EMPLOYEE';

export type OrganizationMemberStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'SUSPENDED';

export type ClientType = 'INDIVIDUAL' | 'CORPORATE';

export type ClientStatus = 'ACTIVE' | 'INACTIVE' | 'PROSPECT' | 'SUSPENDED';

export interface Post {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  userId: string;
  organizationId: string | null;
}

export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: UserRole;
  banned: boolean | null;
  banReason: string | null;
  banExpires: Date | null;
}

export interface Organization {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  slug: string;
  description: string | null;
  website: string | null;
  logo: string | null;
  isActive: boolean;
  maxMembers: number | null;
  maxClients: number | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zipCode: string | null;
  ownerId: string;
}

export interface OrganizationInvite {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  role: OrganizationRole;
  token: string;
  expiresAt: Date;
  organizationId: string;
  invitedBy: string;
}

export interface OrganizationMember {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  role: OrganizationRole;
  status: OrganizationMemberStatus;
  joinedAt: Date | null;
  leftAt: Date | null;
  title: string | null;
  department: string | null;
  salary: string | null; // Decimal (10,2)
  hourlyRate: string | null; // Decimal (8,2)
  canManageClients: boolean;
  canViewReports: boolean;
  canManageProjects: boolean;
  userId: string;
  organizationId: string;
}

export interface Client {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string | null;
  phone: string | null;
  status: ClientStatus;
  type: ClientType;
  cpf: string | null;
  birthDate: Date | null;
  cnpj: string | null;
  companyName: string | null;
  tradeName: string | null;
  website: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zipCode: string | null;
  contractValue: string | null; // Decimal (12,2)
  contractStart: Date | null;
  contractEnd: Date | null;
  paymentTerms: string | null;
  creditLimit: string | null; // Decimal (10,2)
  notes: string | null;
  tags: string[];
  organizationId: string;
}

export interface Invoice {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  invoiceNumber: string;
  amount: string; // Decimal (12,2)
  dueDate: Date;
  paidDate: Date | null;
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  clientId: string;
}

export interface InvoiceItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  model: string;
  brand: string;
  color: string | null;
  ocurrenceDescription: string | null;
  acessories: string | null;
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  technicalResponsible: string | null;
  amount: string; // Decimal (12,2)
  invoiceId: string;
}

export interface Session {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  token: string;
  ipAddress: string | null;
  userAgent: string | null;
  impersonatedBy: string | null;
  userId: string;
}
