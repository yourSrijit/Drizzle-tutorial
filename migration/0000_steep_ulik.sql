CREATE TABLE IF NOT EXISTS "Todo" (
	"title" text NOT NULL,
	"desc" varchar(255) NOT NULL,
	"isComplete" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
