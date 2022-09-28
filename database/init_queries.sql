
CREATE TABLE "public".Sellers
(
 pk_seller_id         serial PRIMARY KEY,
 seller_email         varchar(50) UNIQUE NOT NULL,
 password             varchar NOT NULL,
 seller_nickname      varchar(20) UNIQUE NOT NULL,
 seller_bio           varchar(50) NULL,
 kitchen_name         varchar(30) UNIQUE NULL,
 pickup_window_start  time NULL,
 pickup_window_end    time  NULL,
 seller_street_name   varchar(50)  NULL,
 seller_street_number varchar(20)  NULL,
 seller_city          varchar(20)  NULL,
 seller_state         varchar(20)  NULL,
 seller_zip_code      varchar(10)  NULL,
 cuisine              varchar NULL,
 market_enabled       boolean NULL
 seller_name          varchar (50) NULL, 
 seller_image         varchar NULL,
);

CREATE TABLE "public".Buyers
(
 pk_buyer_id         serial PRIMARY KEY,
 buyer_email         varchar(50) UNIQUE NOT NULL,
 password            varchar NOT NULL,
 buyer_nickname      varchar(20) UNIQUE NOT NULL,
 buyer_street_name   varchar(30) NULL,
 buyer_street_number integer NULL,
 buyer_zip_code      varchar(10) NULL,
 buyer_city          varchar(20) NULL,
 
);

CREATE TABLE "public".Dishes
(
 pk_dish_id         serial PRIMARY KEY,
 dish_name          varchar(50) NOT NULL,
 description        varchar(100) NOT NULL,
 price              money NOT NULL,
 quantity_available integer NULL,
 dish_photo_url     varchar NULL,
 fk_seller_id       serial NOT NULL,
 CONSTRAINT fk_seller_id
FOREIGN KEY ("fk_seller_id") references Sellers("pk_seller_id") on delete cascade
);

CREATE TABLE "public".Orders
(
 pk_order_id       serial PRIMARY KEY,
 fk_seller_id      serial NOT NULL,
 fk_buyer_id       serial NOT NULL,
 fulfilled         boolean NULL,
 order_date        DATE NULL,
 total             integer NULL
 CONSTRAINT fk_seller_id
 FOREIGN KEY ("fk_seller_id") references Sellers("pk_seller_id"),
 CONSTRAINT fk_buyer_id
 FOREIGN KEY ("fk_buyer_id") references Buyers("pk_buyer_id") 
);

CREATE TABLE "public".Order_dish
(
 pk_OD_id           serial PRIMARY KEY,
 fk_order_id        serial NOT NULL,
 fk_dish_id         serial NOT NULL,
 quantity           integer NULL,
 CONSTRAINT fk_order_id
 FOREIGN KEY ("fk_order_id") references Orders("pk_order_id"),
 CONSTRAINT fk_dish_id
 FOREIGN KEY ("fk_dish_id") references Dishes("pk_dish_id") 
);