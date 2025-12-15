import React, { useState } from 'react';

interface InputPanelProps {
  onGenerate: (text: string[]) => void;
  isExpanded: boolean;
  onExpand: () => void;
}

const PRESETS = [
  {
    title: "The Reflective Gardener",
    desc: "Growth, patience, and observation.",
    data: `The rain today felt nourishing, not gloomy.
My project is growing slowly, but the roots are strong.
I feel a bit wilted after that meeting.
Need to prune some bad habits this week.
Grateful for the sunshine this morning.
Patience is the hardest lesson to learn.`
  },
  {
    title: "The Stormy Creator",
    desc: "Intense bursts of energy and doubt.",
    data: `Why is everything a mess?!
I created something beautiful today, finally.
Everyone is moving too slow.
I love the chaos, but I hate the noise.
Feeling like a hurricane in a library.
Burnout is creeping in again.`
  },
  {
    title: "The Gentle Connector",
    desc: "Warmth, family, and soft bonds.",
    data: `Called mom today, her voice is home.
Worried about my friend, he seems distant.
Sunday brunch was lovely.
I miss the way we used to talk.
Sending love to everyone I know.
Hope I'm doing enough for them.`
  }
];

export const InputPanel: React.FC<InputPanelProps> = ({ onGenerate, isExpanded, onExpand }) => {
  const [text, setText] = useState('');

  const handleGenerate = () => {
    const lines = text.split('\n');
    onGenerate(lines);
  };

  const handlePreset = (presetText: string) => {
    setText(presetText);
    setTimeout(() => {
        const lines = presetText.split('\n');
        onGenerate(lines);
    }, 100);
  };

  return (
    <div className={`absolute top-0 left-0 h-full w-full md:w-[500px] glass-panel border-r border-white/50 p-10 flex flex-col z-20 shadow-2xl text-gallery-charcoal bg-white/40 transition-all duration-500 ease-in-out transform ${isExpanded ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-10 opacity-0 pointer-events-none'}`}>
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-gallery-charcoal tracking-tight mb-2">
          Mind Gallery
        </h1>
        <p className="text-sm text-gallery-charcoal/60 font-sans tracking-wide uppercase">Curate Your Consciousness</p>
      </div>

      {/* Preset Cards */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        <p className="text-xs text-gallery-charcoal/50 font-bold uppercase tracking-widest mb-1">Select an Exhibit</p>
        {PRESETS.map((p, i) => (
           <button
             key={i}
             onClick={() => handlePreset(p.data)}
             className="text-left p-4 rounded-xl bg-white/40 hover:bg-white/70 border border-white hover:border-gallery-lime transition-all group shadow-sm"
           >
             <div className="font-serif text-lg text-gallery-charcoal group-hover:text-black">{p.title}</div>
             <div className="text-xs text-gallery-charcoal/70">{p.desc}</div>
           </button>
        ))}
      </div>

      <p className="text-gallery-charcoal/70 text-sm mb-2">Or scatter your thoughts here:</p>

      <div className="flex-1 flex flex-col relative mb-4">
        <textarea
          className="flex-1 bg-white/40 border border-white/80 rounded-xl p-4 text-gallery-charcoal text-sm focus:border-gallery-lime focus:ring-0 focus:outline-none resize-none transition-colors placeholder-gallery-charcoal/40 font-sans leading-relaxed shadow-inner"
          placeholder="What is blooming in your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
        />
      </div>

      <button 
        onClick={handleGenerate}
        disabled={!text.trim()}
        className="py-4 px-6 rounded-xl bg-gallery-lime text-gallery-charcoal font-serif text-lg font-bold shadow-lg shadow-gallery-lime/20 hover:bg-gallery-yellow hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed transition-all"
      >
        Materialize
      </button>

      <div className="mt-6 text-center">
        <p className="text-[10px] text-gallery-charcoal/40 tracking-widest uppercase">
          Private Sanctuary • Local Storage
        </p>
      </div>
    </div>
  );
};