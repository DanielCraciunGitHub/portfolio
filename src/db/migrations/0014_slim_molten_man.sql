CREATE TABLE `articleViews` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`articleSlug` text(255) NOT NULL,
	`userId` text(255),
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
