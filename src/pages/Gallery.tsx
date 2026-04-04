import { useState, useRef } from "react";
import { Play, Maximize2, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface VideoItem {
  id: string;
  src: string;
  title: string;
  description: string;
  duration: string;
  category: string;
}

const videos: VideoItem[] = [
  {
    id: "1",
    src: "/videos/factory-tour-1.mp4",
    title: "Production Floor Walkthrough",
    description:
      "A complete walkthrough of our state-of-the-art copper conductor production line — from raw material intake to finished coil packaging.",
    duration: "0:30",
    category: "Production",
  },
  {
    id: "2",
    src: "/videos/factory-tour-2.mp4",
    title: "Quality Assurance Lab",
    description:
      "Inside our quality lab where every batch undergoes rigorous testing — dimensional accuracy, conductivity, and insulation integrity checks.",
    duration: "0:28",
    category: "Quality",
  },
];

const Gallery = () => {
  const [lightboxVideo, setLightboxVideo] = useState<VideoItem | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Banner */}
      <section className="pt-28 pb-20 bg-muted">
        <div className="container mx-auto px-6 text-center">
          <p className="text-minimal text-muted-foreground tracking-widest mb-4">
            FACTORY FOOTAGE
          </p>
          <h1 className="text-4xl md:text-6xl font-light text-foreground leading-tight max-w-3xl mx-auto">
            See Our Facility
            <br />
            <span className="font-medium">In Action</span>
          </h1>
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore real footage from our manufacturing facility — from the
            production floor to the quality lab.
          </p>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onPlay={() => setLightboxVideo(video)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            Want a Live Factory Tour?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            We welcome OEM teams and procurement heads for in-person or virtual
            facility walkthroughs.
          </p>
          <a
            href="/contact"
            className="inline-block bg-foreground text-background px-8 py-4 text-sm font-medium tracking-wider hover:bg-foreground/90 transition-colors duration-300"
          >
            SCHEDULE A VISIT
          </a>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      {lightboxVideo && (
        <Lightbox
          video={lightboxVideo}
          onClose={() => setLightboxVideo(null)}
        />
      )}
    </div>
  );
};

/* ── Video Card ── */
function VideoCard({
  video,
  onPlay,
}: {
  video: VideoItem;
  onPlay: () => void;
}) {
  const previewRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="group">
      {/* Thumbnail */}
      <div
        className="relative aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer border border-border hover:border-foreground/30 transition-all duration-500"
        onClick={onPlay}
        onMouseEnter={() => previewRef.current?.play()}
        onMouseLeave={() => {
          if (previewRef.current) {
            previewRef.current.pause();
            previewRef.current.currentTime = 0;
          }
        }}
      >
        <video
          ref={previewRef}
          src={video.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 group-hover:bg-foreground/10 transition-colors duration-300">
          <div className="w-16 h-16 rounded-full bg-background/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Play className="w-6 h-6 text-foreground ml-1" />
          </div>
        </div>

        {/* Duration badge */}
        <span className="absolute bottom-3 right-3 text-xs bg-foreground/80 text-background px-2 py-1 rounded">
          {video.duration}
        </span>

        {/* Category badge */}
        <span className="absolute top-3 left-3 text-xs bg-background/80 text-foreground px-2 py-1 rounded tracking-wider uppercase">
          {video.category}
        </span>
      </div>

      {/* Info */}
      <div className="mt-4">
        <h3 className="text-xl font-medium text-foreground group-hover:text-foreground/80 transition-colors duration-300">
          {video.title}
        </h3>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          {video.description}
        </p>
      </div>
    </div>
  );
}

/* ── Lightbox ── */
function Lightbox({
  video,
  onClose,
}: {
  video: VideoItem;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-background hover:text-background/70 transition-colors"
      >
        <X className="w-8 h-8" />
      </button>

      <div
        className="w-full max-w-5xl mx-6"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src={video.src}
          autoPlay
          controls
          playsInline
          className="w-full rounded-lg"
        />
        <div className="mt-4 text-center">
          <h3 className="text-xl font-medium text-background">{video.title}</h3>
          <p className="text-background/60 text-sm mt-1">{video.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
