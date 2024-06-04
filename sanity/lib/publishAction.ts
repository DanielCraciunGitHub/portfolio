// import { DocumentActionComponent } from "sanity";

// export function createImprovedAction(
//   originalPublishAction: DocumentActionComponent,
// ) {
//   const BetterAction = (props) => {
//     const originalResult = originalPublishAction(props);
//     return {
//       ...originalResult,
//       onHandle: () => {
//         // Add our custom functionality
//         console.log("Hello world!");
//         // then delegate to original handler
//         originalResult.onHandle();
//       },
//     };
//   };
//   return BetterAction;
// }
