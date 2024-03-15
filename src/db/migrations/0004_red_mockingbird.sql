CREATE TABLE `articleComments` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`articleSlug` text(255) NOT NULL,
	`userId` text(255) NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP,
	`body` text,
	`likes` integer DEFAULT 0,
	`parentId` text(255)
);
--> statement-breakpoint
CREATE TABLE `articleLikes` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`commentId` text(255),
	`articleSlug` text(255) NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP
);
