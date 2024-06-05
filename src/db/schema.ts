import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const urls = pgTable(
  "urls",
  {
    id: serial("id").primaryKey(),
    key: varchar("key", { length: 256 }),
    shortUrl: varchar("short_url", { length: 256 }),
    longUrl: text("long_url"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    UpdatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (urls) => {
    return {
      shortIndex: uniqueIndex("short_idx").on(urls.shortUrl),
    };
  }
);
