ALTER TABLE articleComments ADD `name` text;--> statement-breakpoint
ALTER TABLE articleComments ADD `updatedAt` text DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE articleComments ADD `body` text;--> statement-breakpoint
ALTER TABLE articleComments ADD `likes` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `articleComments` DROP COLUMN `createdAt`;