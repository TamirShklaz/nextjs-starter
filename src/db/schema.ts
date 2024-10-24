import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const nurses = pgTable("nurses", {
  id: uuid().defaultRandom().primaryKey(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
  name: text().notNull(),
})

export const shifts = pgTable("shifts", {
  id: uuid().defaultRandom().primaryKey(),
  createdAt: timestamp().defaultNow().notNull(),
  nurseId: uuid()
    .notNull()
    .references(() => nurses.id, { onDelete: "cascade" }),
  date: timestamp().notNull(),
})

export const nurseRelations = relations(nurses, ({ many, one }) => ({
  shifts: many(shifts),
}))

export const shiftRelations = relations(shifts, ({ one }) => ({
  nurse: one(nurses, {
    fields: [shifts.nurseId],
    references: [nurses.id],
  }),
}))
