CREATE TABLE `notes` (
	`id` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`body` text NOT NULL DEFAULT (''),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`deleted` boolean NOT NULL DEFAULT false,
	`archived` boolean NOT NULL DEFAULT false,
	`reminder` timestamp,
	CONSTRAINT `notes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `is_admin`;