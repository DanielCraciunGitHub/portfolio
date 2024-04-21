CREATE TABLE `articleComments` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`articleSlug` text(255) NOT NULL,
	`userId` text(255) NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP,
	`isEdited` integer DEFAULT 0,
	`replyingTo` text,
	`body` text,
	`parentId` text(255),
	`resolved` integer DEFAULT false,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`parentId`) REFERENCES `articleComments`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `articleLikes` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`commentId` text(255),
	`articleSlug` text(255) NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`commentId`) REFERENCES `articleComments`(`id`) ON UPDATE no action ON DELETE cascade
);
