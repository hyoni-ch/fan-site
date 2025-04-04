import { getAlbumList } from "@/api/discography";
import { Album } from "@/types/iprofile";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function AlbumTab() {
  const [albums, setAlbums] = useState<Album[]>([]);
  //마운트시 getAlbumLList 실행 후 목록 저장.
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-50px 0px",
  });

  useEffect(() => {
    if (inView) {
      const fetchAlbumList = async () => {
        const albumList = await getAlbumList();
        setAlbums(albumList);
        console.log(albumList);
      };
      fetchAlbumList();
    }
  }, [inView]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" ref={ref}>
      <AnimatePresence>
        {inView &&
          albums.map((album) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                key={album.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 4,
                }}
              >
                <Image
                  src={`/api${album.albumImages[0]?.url}`}
                  alt={album.title}
                  width={200}
                  height={200}
                  objectFit="contain"
                />
                <Typography variant="body2" fontWeight={600} mt={2}>
                  {album.title}
                </Typography>
                <Typography variant="body2" fontWeight={400} mt={2}>
                  {album.description}
                </Typography>
                <Typography style={{ fontSize: "0.7rem", color: "#9c9c9c" }}>
                  {album.releaseDate}
                </Typography>
              </Box>
            </motion.div>
          ))}
      </AnimatePresence>
      <Box sx={{ marginTop: "100px" }}>
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/3f9oODTECIUKiQweioS0mS?utm_source=generator&theme=0"
          width="300"
          height="380"
          frameBorder="0"
          allowFullScreen
          allow="encrypted-media"
          loading="lazy"
        />
      </Box>
    </Box>
  );
}

export default AlbumTab;
