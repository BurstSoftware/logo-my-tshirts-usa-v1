import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Type, Upload, Shapes, Palette, RotateCw, Trash2, Download, ShoppingCart, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';

type DesignElement = {
  id: string;
  type: 'text' | 'image';
  content: string;
  x: number;
  y: number;
  width: number;
  fontSize: number;
  color: string;
  fontWeight: number;
  rotation: number;
};

const shirtColors = [
  { name: 'White', hex: '#ffffff' },
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'Navy', hex: '#1a2c4d' },
  { name: 'Charcoal', hex: '#3a3a3a' },
  { name: 'Heather Gray', hex: '#b0b0b0' },
  { name: 'Red', hex: '#c41e3a' },
  { name: 'Royal Blue', hex: '#1d4ed8' },
  { name: 'Forest', hex: '#2d6a4f' },
  { name: 'Gold', hex: '#d4a017' },
  { name: 'Orange', hex: '#e8590c' },
];

const textColors = [
  '#ffffff', '#1a1a1a', '#c41e3a', '#1d4ed8', '#2d6a4f',
  '#d4a017', '#e8590c', '#7c3aed', '#0891b2', '#db2777',
];

const fonts = [
  { label: 'Bold Sans', value: '"Plus Jakarta Sans", sans-serif', weight: 800 },
  { label: 'Modern', value: 'Inter, sans-serif', weight: 700 },
  { label: 'Classic', value: 'Georgia, serif', weight: 700 },
  { label: 'Mono', value: '"Courier New", monospace', weight: 700 },
];

const shirtTypes = [
  { label: 'T-Shirt', price: 8.95 },
  { label: 'Polo', price: 18.95 },
  { label: 'Hoodie', price: 29.95 },
  { label: 'Cap', price: 22.95 },
];

let elementIdCounter = 0;

export default function DesignerPage() {
  const [shirtColor, setShirtColor] = useState(shirtColors[0]);
  const [shirtType, setShirtType] = useState(shirtTypes[0]);
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [textValue, setTextValue] = useState('YOUR LOGO');
  const [textColor, setTextColor] = useState(textColors[1]);
  const [font, setFont] = useState(fonts[0]);
  const [fontSize, setFontSize] = useState(36);
  const [quantity, setQuantity] = useState(24);
  const [side, setSide] = useState<'front' | 'back'>('front');
  const fileRef = useRef<HTMLInputElement>(null);

  const selected = elements.find((e) => e.id === selectedId) || null;

  const addText = useCallback(() => {
    const id = `el-${++elementIdCounter}`;
    const newEl: DesignElement = {
      id,
      type: 'text',
      content: textValue || 'YOUR TEXT',
      x: 150,
      y: 180,
      width: 200,
      fontSize,
      color: textColor,
      fontWeight: font.weight,
      rotation: 0,
    };
    setElements((prev) => [...prev, newEl]);
    setSelectedId(id);
  }, [textValue, fontSize, textColor, font]);

  const addImage = useCallback((url: string) => {
    const id = `el-${++elementIdCounter}`;
    const newEl: DesignElement = {
      id,
      type: 'image',
      content: url,
      x: 130,
      y: 150,
      width: 120,
      fontSize: 0,
      color: '#000000',
      fontWeight: 0,
      rotation: 0,
    };
    setElements((prev) => [...prev, newEl]);
    setSelectedId(id);
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => addImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const updateSelected = (patch: Partial<DesignElement>) => {
    if (!selectedId) return;
    setElements((prev) => prev.map((el) => (el.id === selectedId ? { ...el, ...patch } : el)));
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    setElements((prev) => prev.filter((el) => el.id !== selectedId));
    setSelectedId(null);
  };

  const startDrag = (e: React.PointerEvent, el: DesignElement) => {
    e.stopPropagation();
    setSelectedId(el.id);
    const canvas = e.currentTarget.parentElement as HTMLElement;
    const rect = canvas.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const origX = el.x;
    const origY = el.y;

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      const newX = Math.max(0, Math.min(rect.width - el.width, origX + dx));
      const newY = Math.max(0, Math.min(rect.height - 40, origY + dy));
      setElements((prev) => prev.map((p) => (p.id === el.id ? { ...p, x: newX, y: newY } : p)));
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const decorationPrice = elements.length > 0 ? 4.50 : 0;
  const unitPrice = shirtType.price + decorationPrice;
  const totalPrice = unitPrice * quantity;

  return (
    <div className="pt-20 sm:pt-24">
      <div className="container-page">
        <div className="mb-4">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Logo My T-Shirts Designer</h1>
          <p className="mt-1 text-sm text-ink-500">
            Add text or upload your logo, position it on the shirt, and get an instant quote.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* Canvas */}
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
              <div className="flex gap-1 rounded-lg bg-ink-50 p-1">
                <button
                  onClick={() => setSide('front')}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium ${side === 'front' ? 'bg-white text-ink-950 shadow-soft' : 'text-ink-500'}`}
                >
                  Front
                </button>
                <button
                  onClick={() => setSide('back')}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium ${side === 'back' ? 'bg-white text-ink-950 shadow-soft' : 'text-ink-500'}`}
                >
                  Back
                </button>
              </div>
              <button
                onClick={deleteSelected}
                disabled={!selectedId}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-red-500 hover:bg-red-50 disabled:opacity-40"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>

            <div
              className="relative mx-auto flex aspect-square max-w-md items-center justify-center bg-ink-50 p-8"
              onClick={() => setSelectedId(null)}
            >
              {/* Shirt SVG */}
              <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full p-4" style={{ color: shirtColor.hex }}>
                <path
                  d="M 100 40 L 60 60 L 30 90 L 50 130 L 70 120 L 70 270 L 230 270 L 230 120 L 250 130 L 270 90 L 240 60 L 200 40 L 170 55 Q 150 70 130 55 Z"
                  fill={shirtColor.hex}
                  stroke={shirtColor.hex === '#ffffff' ? '#d5d9e2' : 'rgba(0,0,0,0.15)'}
                  strokeWidth="1.5"
                />
                {side === 'front' && (
                  <ellipse cx="150" cy="58" rx="22" ry="10" fill="rgba(0,0,0,0.06)" />
                )}
              </svg>

              {/* Design elements */}
              <div className="relative h-full w-full max-w-[260px]">
                {elements.map((el) => (
                  <div
                    key={el.id}
                    onPointerDown={(e) => startDrag(e, el)}
                    onClick={(e) => { e.stopPropagation(); setSelectedId(el.id); }}
                    className={`absolute cursor-move select-none ${selectedId === el.id ? 'ring-2 ring-brand-500 ring-offset-2' : ''}`}
                    style={{
                      left: el.x,
                      top: el.y,
                      width: el.width,
                      transform: `rotate(${el.rotation}deg)`,
                      transformOrigin: 'center',
                    }}
                  >
                    {el.type === 'text' ? (
                      <span
                        style={{
                          fontFamily: font.value,
                          fontSize: `${el.fontSize}px`,
                          color: el.color,
                          fontWeight: el.fontWeight,
                          display: 'block',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {el.content}
                      </span>
                    ) : (
                      <img src={el.content} alt="Uploaded logo" className="w-full h-auto pointer-events-none" />
                    )}
                  </div>
                ))}
              </div>

              {elements.length === 0 && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <p className="text-sm text-ink-300">Add text or upload a logo to get started</p>
                </div>
              )}
            </div>

            {/* Shirt color picker */}
            <div className="border-t border-ink-100 p-4">
              <p className="mb-2 text-sm font-semibold text-ink-900">Shirt color</p>
              <div className="flex flex-wrap gap-2">
                {shirtColors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setShirtColor(c)}
                    className={`h-8 w-8 rounded-full ring-2 transition-all ${shirtColor.name === c.name ? 'ring-brand-600 ring-offset-2' : 'ring-ink-200 hover:ring-brand-300'}`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {/* Shirt type */}
            <div className="card p-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-ink-900">
                <Shapes className="h-4 w-4 text-brand-600" />
                Product Type
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {shirtTypes.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => setShirtType(t)}
                    className={`rounded-xl border-2 px-3 py-2 text-left transition-all ${
                      shirtType.label === t.label
                        ? 'border-brand-600 bg-brand-50'
                        : 'border-ink-200 hover:border-brand-300'
                    }`}
                  >
                    <p className="text-sm font-semibold text-ink-900">{t.label}</p>
                    <p className="text-xs text-ink-400">${t.price.toFixed(2)}/ea</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Add text */}
            <div className="card p-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-ink-900">
                <Type className="h-4 w-4 text-brand-600" />
                Add Text
              </h3>
              <input
                type="text"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder="Enter your text"
                className="mt-3 w-full rounded-lg border border-ink-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <div className="mt-3">
                <label className="text-xs font-medium text-ink-500">Font</label>
                <select
                  value={font.label}
                  onChange={(e) => setFont(fonts.find((f) => f.label === e.target.value) || fonts[0])}
                  className="mt-1 w-full rounded-lg border border-ink-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {fonts.map((f) => (
                    <option key={f.label} value={f.label}>{f.label}</option>
                  ))}
                </select>
              </div>
              <div className="mt-3">
                <label className="text-xs font-medium text-ink-500">Font size: {fontSize}px</label>
                <input
                  type="range"
                  min="12"
                  max="72"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="mt-1 w-full accent-brand-600"
                />
              </div>
              <div className="mt-3">
                <label className="text-xs font-medium text-ink-500">Text color</label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {textColors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setTextColor(c)}
                      className={`h-6 w-6 rounded-full ring-2 transition-all ${textColor === c ? 'ring-brand-600 ring-offset-1' : 'ring-ink-200'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
              <button onClick={addText} className="btn-primary mt-4 w-full">
                <Plus className="h-4 w-4" />
                Add Text
              </button>
            </div>

            {/* Upload logo */}
            <div className="card p-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-ink-900">
                <Upload className="h-4 w-4 text-brand-600" />
                Upload Your Logo
              </h3>
              <p className="mt-1 text-xs text-ink-400">PNG, JPG, or SVG. Transparent PNG works best.</p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
              <button onClick={() => fileRef.current?.click()} className="btn-secondary mt-3 w-full">
                <Upload className="h-4 w-4" />
                Choose File
              </button>
            </div>

            {/* Selected element controls */}
            {selected && (
              <div className="card p-4">
                <h3 className="flex items-center gap-2 text-sm font-bold text-ink-900">
                  <Palette className="h-4 w-4 text-brand-600" />
                  Edit Selected
                </h3>
                {selected.type === 'text' && (
                  <input
                    type="text"
                    value={selected.content}
                    onChange={(e) => updateSelected({ content: e.target.value })}
                    className="mt-3 w-full rounded-lg border border-ink-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                )}
                {selected.type === 'text' && (
                  <>
                    <div className="mt-3">
                      <label className="text-xs font-medium text-ink-500">Size: {selected.fontSize}px</label>
                      <input
                        type="range"
                        min="12"
                        max="72"
                        value={selected.fontSize}
                        onChange={(e) => updateSelected({ fontSize: Number(e.target.value) })}
                        className="mt-1 w-full accent-brand-600"
                      />
                    </div>
                    <div className="mt-3">
                      <label className="text-xs font-medium text-ink-500">Color</label>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {textColors.map((c) => (
                          <button
                            key={c}
                            onClick={() => updateSelected({ color: c })}
                            className={`h-6 w-6 rounded-full ring-2 transition-all ${selected.color === c ? 'ring-brand-600 ring-offset-1' : 'ring-ink-200'}`}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {selected.type === 'image' && (
                  <div className="mt-3">
                    <label className="text-xs font-medium text-ink-500">Width: {selected.width}px</label>
                    <input
                      type="range"
                      min="40"
                      max="240"
                      value={selected.width}
                      onChange={(e) => updateSelected({ width: Number(e.target.value) })}
                      className="mt-1 w-full accent-brand-600"
                    />
                  </div>
                )}
                <div className="mt-3">
                  <label className="text-xs font-medium text-ink-500">Rotation: {selected.rotation}°</label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={selected.rotation}
                    onChange={(e) => updateSelected({ rotation: Number(e.target.value) })}
                    className="mt-1 w-full accent-brand-600"
                  />
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => updateSelected({ rotation: selected.rotation + 90 })}
                    className="btn-secondary flex-1"
                  >
                    <RotateCw className="h-4 w-4" />
                    Rotate 90°
                  </button>
                  <button onClick={deleteSelected} className="btn flex-1 bg-red-50 text-red-600 hover:bg-red-100 px-5 py-2.5 text-sm">
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>
            )}

            {/* Quantity + Quote */}
            <div className="card p-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-ink-900">
                <ShoppingCart className="h-4 w-4 text-brand-600" />
                Your Quote
              </h3>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-ink-500">Quantity</span>
                <div className="flex items-center gap-1 rounded-lg ring-1 ring-ink-200">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-8 w-8 items-center justify-center text-ink-500 hover:bg-ink-50"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-8 w-8 items-center justify-center text-ink-500 hover:bg-ink-50"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="mt-3 space-y-1 border-t border-ink-100 pt-3 text-sm">
                <div className="flex justify-between text-ink-500">
                  <span>{shirtType.label} ({shirtColor.name})</span>
                  <span>${shirtType.price.toFixed(2)}/ea</span>
                </div>
                {decorationPrice > 0 && (
                  <div className="flex justify-between text-ink-500">
                    <span>Logo decoration</span>
                    <span>${decorationPrice.toFixed(2)}/ea</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 text-base font-bold text-ink-950">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <button className="btn-primary mt-4 w-full">
                <Download className="h-4 w-4" />
                Request This Design
              </button>
              <Link to="/category/t-shirts" className="btn-ghost mt-2 w-full">
                <ChevronLeft className="h-4 w-4" />
                Browse More Products
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
