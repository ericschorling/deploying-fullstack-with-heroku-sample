CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    userName VARCHAR(50) NOT NULL,
    realName  VARCHAR(50),
    lastName VARCHAR(50),
    avatarSource VARCHAR(8000)
);

CREATE TABLE drawings(
    drawingId SERIAL PRIMARY KEY,
    userId INT REFERENCES users(userId),
    drawingSource VARCHAR(8000)
);

INSERT INTO users (userName, realName, lastName, avatarSource) VALUES ('eschorling', 'Eric', 'Schorling', 'https://media-exp1.licdn.com/dms/image/C5603AQEmG5YspsKajg/profile-displayphoto-shrink_100_100/0/1517424602687?e=1642636800&v=beta&t=0U3M6sLhkonQs2QRcVojvby2Y_QdiD3zUZIGT32aLUU');
