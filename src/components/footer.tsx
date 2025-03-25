import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div>
      <div style={footerLinkStyle}>
        <Link href="https://www.facebook.com/JOYURI.offcl">facebook</Link>
        <Link href="https://www.instagram.com/joyuri_offcl/#">instagram</Link>
        <Link href="https://x.com/JOYURI_offcl">x</Link>
        <Link href="https://open.spotify.com/artist/3LFFf4EpKn2krneZ9vozyz">
          spotify
        </Link>
        <Link href="https://www.youtube.com/channel/UCSEVFgCkKem_c3nIBm7F37g">
          youtube
        </Link>
        <Link href="https://www.tiktok.com/@joyuri.offcl">tiktok</Link>
      </div>

      <p>COPYRIGHTⓒ 2025 PROJECT. ALL RIGHTS RESERVED.</p>
    </div>
  );
}

export default Footer;

const footerLinkStyle = {
  display: "flex",
  gap: 10,
};
