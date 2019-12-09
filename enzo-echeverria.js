const name = "enzo-echeverria"
const promo = "B2A"

const q1 = 
`
SELECT Name, Milliseconds AS "Temps (ms)"
FROM Track
WHERE Milliseconds < (
SELECT Milliseconds
FROM Track
WHERE TrackId = 3457)
ORDER BY Milliseconds ASC
`
const q3 = 
`
SELECT p.Name, COUNT(p.Name) AS "Nombre de chanson",
SUM(t.Milliseconds)/60000 AS "Temps total de la playlist (min)",
(SUM(t.Milliseconds)/COUNT(p.Name))/60000 AS "Temps moyen d'une chanson (min)"
FROM Playlist p
JOIN PlaylistTrack pt
ON p.PlaylistId = pt.PlaylistId
JOIN Track t
ON pt.TrackId = t.TrackId
GROUP BY p.Name 
`
const q8 = 
`
SELECT t.Name
al.Title AS "Album Title",
ar.Title AS "Artist",
m.Name AS "Media Type",
g.Name AS "Genre",
t.UnitPrice
FROM MediaType m
JOIN Track t
ON m.MediaTypeid = t.MediaTypeId
JOIN Album al
ON t.AlbumId = al.AlbumId
JOIN Artist ar
ON al.ArtistId = ar.ArtistId
JOIN Genre g
ON t.GenreId = g.GenreId
WHERE UnitPrice > (
  SELECT AVG(UnitPrice)
  FROM Track
)
`
const q9 = 
`
SELECT t.Name, g.Name, PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY t.UnitPrice) OVER (PARTITION BY g.Name) AS "Prix du Genre"
FROM Track t
JOIN Genre g
ON t.GenreId = g.GenreId
WHERE t.UnitPrice < (
  SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY t.UnitPrice) OVER (PARTITION BY g.Name)
  FROM Track t
  JOIN Genre g
  ON t.GenreId = g.GenreId
)
`
const q10 = 
`
SELECT ar.Name AS "Artiste",
COUNT(ar.Name) AS "Nombre de chansons par Artiste",
AVG(t.UnitPrice) AS "Prix moyen des chansons",
MAX(ar.ArtistId) AS "Nombre maximum de chansons"
FROM Playlist p
JOIN PlaylistTrack pt
ON p.PlaylistId = pt.PlaylistId
JOIN Track t
ON pt.TrackId = t.TrackId
JOIN Album al
ON t.AlbumId = al.AlbumId
JOIN Artist ar
ON al.ArtistId = ar.ArtistId
GROUP BY p.Name, ar.Name
ORDER BY p.Name
`
const q12 = 
`
SELECT c.Country AS "Pays",
COUNT(e.Country + c.Country + i.BillingCountry) AS "Total",
COUNT(e.Country) AS "Employee",
COUNT(c.Country) AS "Customer",
COUNT(i.BillingCountry) AS "Invoice"
FROM Employee e
JOIN Customer c
ON e.EmployeeId = c.SupportRepId
JOIN Invoice i
ON c.CustomerId = i.CustomerId
GROUP BY c.Country
`
const q13 = 
`
SELECT g.Name, MAX(t.Milliseconds) AS "Chanson la plus longue"
FROM InvoiceLine il
JOIN Track t
ON il.TrackId = t.TrackId
JOIN Genre g
ON t.GenreId = g.GenreId
GROUP BY g.Name
`
const q16 = 
`
SELECT e.LastName, e.FirstName, SUM(i.InvoiceId) AS "Ventes", e.EmployeeId
FROM Employee e
JOIN Customer c
ON e.EmployeeId = c.SupportRepId
JOIN Invoice i
ON c.CustomerId = i.CustomerId
WHERE e.EmployeeId = 5
GROUP BY e.LastName, e.FirstName, e.EmployeeId
`
const q19 = 
`
INSERT INTO Track (Name, MediaTypeId, Composer, Milliseconds, UnitPrice)
VALUES
('Le Joueur de castagnettes', 1, 'Maurice Larcange', 198000, 0.99),
('Un jour de providence', 1, 'Maurice Larcange', 215000, 0.99),
('Plaisir des bois', 1, 'Maurice Larcange', 198000, 0.99)
`
const q20 = 
`
INSERT INTO Employee (LastName, FirstName, Country)
VALUES
('Dujardin', 'Jean', 'France'),
('Denice', 'Brice', 'France')
`
const q21 = ``
const q22 = 
`
UPDATE Invoice
SET BillingCountry = 'France'
WHERE CONVERT(INT, CONVERT(DATETIME, InvoiceDate)) > 40543
AND
BillingCountry = 'Germany'
`
const q23 = 
`
UPDATE i
SET i.BillingCountry = c.Country
FROM Invoice i
JOIN Customer c
ON i.CustomerId = c.CustomerId
WHERE i.BillingCountry <> c.Country
`
const q24 = 
`
ALTER TABLE Employee
ADD Salary INT
`
const q25 = 
`
UPDATE Employee
SET Salary = ROUND(RAND()*70000+30000, 0)
`
const q26 = 
`
ALTER TABLE Invoice
DROP COLUMN BillingPostalCode
`











































// NE PAS TOUCHER CETTE SECTION
const tp = {name: name, promo: promo, queries: [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26]}
module.exports = tp
