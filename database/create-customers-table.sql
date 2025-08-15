-- Create Customers Table for Customer Users
-- This table stores customer-specific information

CREATE TABLE IF NOT EXISTS public.customers (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100) DEFAULT 'Nairobi',
  country VARCHAR(100) DEFAULT 'Kenya',
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0.00,
  loyalty_points INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON public.customers(user_id);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON public.customers(phone);

-- Enable Row Level Security
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for customers table
CREATE POLICY "Customers can view their own profile" ON public.customers
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Customers can update their own profile" ON public.customers
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Allow auth callback to create customer profiles" ON public.customers
FOR INSERT WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_customers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_customers_updated_at
  BEFORE UPDATE ON public.customers
  FOR EACH ROW
  EXECUTE FUNCTION update_customers_updated_at();

-- Insert sample customer data (optional)
-- INSERT INTO public.customers (user_id, first_name, last_name, phone, address) VALUES 
-- ('sample-uuid', 'John', 'Doe', '+254700000000', 'Sample Address');

-- Test the table creation
SELECT 'Customers table created successfully!' as status;
