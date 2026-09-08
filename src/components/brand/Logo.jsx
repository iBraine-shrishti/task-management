import logoImg from "../../assets/image.png"; // Adjust relative path based on file location

export default function Logo({ dark = false }) {
  return (
    <div className="flex items-center gap-2">
      {/* Replaced CSS block with Image */}
      <img
        src={logoImg}
        alt="iBraine Logo"
        className="h-9 w-auto object-contain"
      />
    </div>
  );
}
