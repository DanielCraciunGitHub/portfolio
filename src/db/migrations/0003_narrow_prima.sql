CREATE TABLE `articleComments` (
	`id` varchar(255) NOT NULL,
	`parentId` varchar(255),
	`userId` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `articleComments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `articleLikes` (
	`id` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `articleLikes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `verificationTokens` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationTokens_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
DROP TABLE `verificationToken`;