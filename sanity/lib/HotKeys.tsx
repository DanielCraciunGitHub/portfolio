import { useMemo } from "react";
import { PortableTextInput, PortableTextInputProps } from "sanity";

import { PortableTextEditor } from "@sanity/portable-text-editor";

// The custom input with two custom hotkeys
export const CustomInput = (props: PortableTextInputProps) => {
  const { path, onItemOpen, onPathFocus } = props;
  // Define the hotkey mapping
  const hotkeys: PortableTextInputProps["hotkeys"] = useMemo(
    () => ({
      // Use the 'marks' prop to toggle
      // text decorators on the currently
      // selected text with a hotkey
      marks: {
        "Ctrl+e": "code",
        "Ctrl+Shift+x": "strike-through",
      },
      // Use the 'custom' prop to define custom
      // functions that can access the underlying
      // editor instance.
      // In this case, the 'Ctrl+l' hotkey toggles
      // a link on the selected text using the
      // PortableTextEditor API with the editor instance.
      custom: {
        "Ctrl+k": (event, portableTextEditor) => {
          const linkType = portableTextEditor.schemaTypes.annotations.find(
            (a) => a.name === "link",
          );
          if (linkType) {
            event.preventDefault();
            event.stopPropagation();
            const activeAnnotations =
              PortableTextEditor.activeAnnotations(portableTextEditor);
            const isLinkActive = activeAnnotations.some(
              (a) => a._type === "link",
            );
            if (isLinkActive) {
              PortableTextEditor.removeAnnotation(portableTextEditor, linkType);
            } else {
              const result = PortableTextEditor.addAnnotation(
                portableTextEditor,
                linkType,
              );
              if (result?.markDefPath) {
                // Open the form member
                onItemOpen(path.concat(result.markDefPath));
                // Move the focus to the 'href' field in the next tick
                setTimeout(() => {
                  onPathFocus(result.markDefPath.concat("href"));
                });
              }
            }
          }
        },
        "Ctrl+.": (event, portableTextEditor) => {
          event.preventDefault();
          event.stopPropagation();
          const block = PortableTextEditor.getSelection(portableTextEditor);
          if (block) {
            PortableTextEditor.toggleList(portableTextEditor, "bullet");
          }
        },
        "Ctrl+/": (event, portableTextEditor) => {
          event.preventDefault();
          event.stopPropagation();
          const block = PortableTextEditor.getSelection(portableTextEditor);
          if (block) {
            PortableTextEditor.toggleList(portableTextEditor, "number");
          }
        },
      },
    }),
    [onPathFocus, onItemOpen, path],
  );

  return <PortableTextInput {...props} hotkeys={hotkeys} />;
};
