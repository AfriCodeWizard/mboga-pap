-- Insert sample categories
INSERT INTO public.categories (name, description, icon) VALUES
('Vegetables', 'Fresh vegetables and greens', '🥬'),
('Fruits', 'Fresh fruits and berries', '🍎'),
('Root Vegetables', 'Potatoes, carrots, and tubers', '🥔'),
('Herbs & Spices', 'Fresh herbs and spices', '🌿'),
('Organic', 'Organic produce', '🌱'),
('Grains & Cereals', 'Rice, maize, and grains', '🌾');

-- Insert sample vendors (these will be linked to actual users when they register)
INSERT INTO public.vendors (business_name, business_description, location, years_in_business, rating, total_ratings, specialties, is_verified) VALUES
('Fresh Harvest', 'I love serving my community with fresh vegetables at fair prices!', 'Westlands Market', 8, 4.7, 156, ARRAY['Fresh Vegetables', 'Herbs'], true),
('Green Valley', 'Fresh vegetables every morning, straight from the farm!', 'Kibera Market', 12, 4.5, 89, ARRAY['Spinach', 'Carrots', 'Eggplant'], true),
('Sunrise Market', 'Quality produce at fair prices, that''s my promise!', 'Kawangware', 6, 4.8, 234, ARRAY['Cabbage', 'Tomatoes', 'Potatoes'], true),
('Wambui''s Greens', 'Traditional greens and organic produce.', 'Westlands', 4, 4.7, 67, ARRAY['Traditional Greens', 'Organic'], true),
('Fruit Basket', 'Fresh fruits and juices for your family.', 'Kilimani', 3, 4.5, 45, ARRAY['Fresh Fruits', 'Juices'], true),
('Organic Hub', 'Organic veggies and herbs delivered.', 'Lavington', 5, 4.8, 123, ARRAY['Organic Veggies', 'Herbs'], true),
('Roots & Tubers', 'Best tubers and roots in town.', 'Kasarani', 7, 4.4, 78, ARRAY['Tubers', 'Roots'], true),
('Salad Stop', 'Fresh salads and veggies every day.', 'Kileleshwa', 2, 4.6, 34, ARRAY['Salads', 'Fresh Veggies'], true);

-- Insert sample products
INSERT INTO public.products (vendor_id, category_id, name, description, price, unit, stock_quantity, images, is_organic, is_featured) VALUES
-- Fresh Harvest products
((SELECT id FROM public.vendors WHERE business_name = 'Fresh Harvest'), (SELECT id FROM public.categories WHERE name = 'Vegetables'), 'Fresh Tomatoes', 'Ripe, red tomatoes from local farms', 150.00, 'kg', 50, ARRAY['/tomatoes.jpg'], false, true),
((SELECT id FROM public.vendors WHERE business_name = 'Fresh Harvest'), (SELECT id FROM public.categories WHERE name = 'Vegetables'), 'Green Spinach', 'Fresh spinach leaves', 80.00, 'bunch', 30, ARRAY['/spinach.jpg'], false, true),
((SELECT id FROM public.vendors WHERE business_name = 'Fresh Harvest'), (SELECT id FROM public.categories WHERE name = 'Herbs & Spices'), 'Fresh Coriander', 'Aromatic coriander leaves', 50.00, 'bunch', 25, ARRAY['/coriander.jpg'], false, false),

-- Green Valley products
((SELECT id FROM public.vendors WHERE business_name = 'Green Valley'), (SELECT id FROM public.categories WHERE name = 'Vegetables'), 'Carrots', 'Sweet, crunchy carrots', 120.00, 'kg', 40, ARRAY['/carrots.jpg'], false, true),
((SELECT id FROM public.vendors WHERE business_name = 'Green Valley'), (SELECT id FROM public.categories WHERE name = 'Vegetables'), 'Eggplant', 'Fresh purple eggplants', 200.00, 'kg', 20, ARRAY['/eggplant.jpg'], false, false),
((SELECT id FROM public.vendors WHERE business_name = 'Green Valley'), (SELECT id FROM public.categories WHERE name = 'Vegetables'), 'Spinach', 'Organic spinach leaves', 100.00, 'bunch', 35, ARRAY['/spinach-organic.jpg'], true, true),

-- Sunrise Market products
((SELECT id FROM public.vendors WHERE business_name = 'Sunrise Market'), (SELECT id FROM public.categories WHERE name = 'Vegetables'), 'Cabbage', 'Fresh green cabbage', 80.00, 'piece', 15, ARRAY['/cabbage.jpg'], false, true),
((SELECT id FROM public.vendors WHERE business_name = 'Sunrise Market'), (SELECT id FROM public.categories WHERE name = 'Root Vegetables'), 'Potatoes', 'Fresh Irish potatoes', 120.00, 'kg', 60, ARRAY['/potatoes.jpg'], false, true),
((SELECT id FROM public.vendors WHERE business_name = 'Sunrise Market'), (SELECT id FROM public.categories WHERE name = 'Vegetables'), 'Onions', 'Fresh red onions', 100.00, 'kg', 45, ARRAY['/onions.jpg'], false, false),

-- Wambui's Greens products
((SELECT id FROM public.vendors WHERE business_name = 'Wambui''s Greens'), (SELECT id FROM public.categories WHERE name = 'Organic'), 'Organic Kale', 'Fresh organic kale', 120.00, 'bunch', 20, ARRAY['/kale-organic.jpg'], true, true),
((SELECT id FROM public.vendors WHERE business_name = 'Wambui''s Greens'), (SELECT id FROM public.categories WHERE name = 'Herbs & Spices'), 'Fresh Garlic', 'Organic garlic cloves', 200.00, 'kg', 30, ARRAY['/garlic.jpg'], true, false),

-- Fruit Basket products
((SELECT id FROM public.vendors WHERE business_name = 'Fruit Basket'), (SELECT id FROM public.categories WHERE name = 'Fruits'), 'Bananas', 'Sweet yellow bananas', 150.00, 'bunch', 25, ARRAY['/bananas.jpg'], false, true),
((SELECT id FROM public.vendors WHERE business_name = 'Fruit Basket'), (SELECT id FROM public.categories WHERE name = 'Fruits'), 'Mangoes', 'Ripe, sweet mangoes', 300.00, 'kg', 15, ARRAY['/mangoes.jpg'], false, true),
((SELECT id FROM public.vendors WHERE business_name = 'Fruit Basket'), (SELECT id FROM public.categories WHERE name = 'Fruits'), 'Pineapples', 'Fresh pineapples', 250.00, 'piece', 10, ARRAY['/pineapples.jpg'], false, false),

-- Organic Hub products
((SELECT id FROM public.vendors WHERE business_name = 'Organic Hub'), (SELECT id FROM public.categories WHERE name = 'Organic'), 'Organic Tomatoes', 'Certified organic tomatoes', 250.00, 'kg', 30, ARRAY['/tomatoes-organic.jpg'], true, true),
((SELECT id FROM public.vendors WHERE business_name = 'Organic Hub'), (SELECT id FROM public.categories WHERE name = 'Herbs & Spices'), 'Organic Basil', 'Fresh organic basil', 180.00, 'bunch', 15, ARRAY['/basil-organic.jpg'], true, false),

-- Roots & Tubers products
((SELECT id FROM public.vendors WHERE business_name = 'Roots & Tubers'), (SELECT id FROM public.categories WHERE name = 'Root Vegetables'), 'Sweet Potatoes', 'Fresh sweet potatoes', 150.00, 'kg', 40, ARRAY['/sweet-potatoes.jpg'], false, true),
((SELECT id FROM public.vendors WHERE business_name = 'Roots & Tubers'), (SELECT id FROM public.categories WHERE name = 'Root Vegetables'), 'Cassava', 'Fresh cassava roots', 100.00, 'kg', 35, ARRAY['/cassava.jpg'], false, false),

-- Salad Stop products
((SELECT id FROM public.vendors WHERE business_name = 'Salad Stop'), (SELECT id FROM public.categories WHERE name = 'Vegetables'), 'Mixed Salad Greens', 'Fresh mixed salad greens', 200.00, 'pack', 20, ARRAY['/salad-greens.jpg'], false, true),
((SELECT id FROM public.vendors WHERE business_name = 'Salad Stop'), (SELECT id FROM public.categories WHERE name = 'Vegetables'), 'Cucumber', 'Fresh cucumbers', 120.00, 'kg', 25, ARRAY['/cucumber.jpg'], false, false); 