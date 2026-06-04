import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";

/** Extensions shared by the admin editor (content) and public HTML rendering. */
export function getTiptapContentExtensions() {
  return [
    StarterKit,
    Image.configure({ inline: false }),
    Link.configure({
      openOnClick: true,
      autolink: true,
      defaultProtocol: "https",
    }),
  ];
}
