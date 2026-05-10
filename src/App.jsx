import { useState, useEffect, useRef } from "react";

const PRELOADED = [
  { id:"pre_01", name:"Huevo",                     unit:"pieza",          cal:70,  pro:6,    carbs:1,  fat:5,   preloaded:true },
  { id:"pre_02", name:"Clara de huevo",             unit:"porción (90ml)", cal:45,  pro:9.9,  carbs:0.6,fat:0.2, preloaded:true },
  { id:"pre_03", name:"Pan Bimbo Cero",             unit:"rebanada",       cal:50,  pro:4,    carbs:9,  fat:1,   preloaded:true },
  { id:"pre_04", name:"Leche Lala 100",             unit:"vaso (240ml)",   cal:80,  pro:14,   carbs:9,  fat:0,   preloaded:true },
  { id:"pre_05", name:"Jamón de pavo",              unit:"rebanada",       cal:60,  pro:9,    carbs:2,  fat:1,   preloaded:true },
  { id:"pre_06", name:"Yogurt griego 0%",           unit:"porción (190g)", cal:100, pro:17,   carbs:6,  fat:0,   preloaded:true },
  { id:"pre_07", name:"Granola",                    unit:"porción (30g)",  cal:90,  pro:2,    carbs:15, fat:3,   preloaded:true },
  { id:"pre_08", name:"Frijoles cocidos",           unit:"porción",        cal:120, pro:8,    carbs:20, fat:1,   preloaded:true },
  { id:"pre_09", name:"Pechuga de pollo (100g)",    unit:"porción",        cal:165, pro:31,   carbs:0,  fat:3.6, preloaded:true },
  { id:"pre_10", name:"Pechuga de pollo (180g)",    unit:"porción",        cal:297, pro:55.8, carbs:0,  fat:6.5, preloaded:true },
  { id:"pre_11", name:"Bolillo (60g)",              unit:"pieza",          cal:180, pro:6,    carbs:34, fat:1.5, preloaded:true },
  { id:"pre_12", name:"Bolillo sin migajón (40g)",  unit:"pieza",          cal:120, pro:4,    carbs:22, fat:1,   preloaded:true },
  { id:"pre_13", name:"Aguacate (40g)",             unit:"porción",        cal:80,  pro:1,    carbs:4,  fat:7,   preloaded:true },
  { id:"pre_14", name:"Atún en agua",               unit:"lata",           cal:80,  pro:18,   carbs:0,  fat:1,   preloaded:true },
  { id:"pre_15", name:"Tortilla de maíz",           unit:"pieza",          cal:65,  pro:1.7,  carbs:14, fat:0.7, preloaded:true },
  { id:"pre_16", name:"Arroz cocido",               unit:"porción (120g)", cal:156, pro:3.2,  carbs:34, fat:0.3, preloaded:true },
  { id:"pre_17", name:"Papa cocida",                unit:"porción (160g)", cal:124, pro:2.6,  carbs:28, fat:0.2, preloaded:true },
  { id:"pre_18", name:"Pasta cocida",               unit:"porción (140g)", cal:220, pro:8,    carbs:43, fat:1.3, preloaded:true },
  { id:"pre_19", name:"Avena",                      unit:"porción (40g)",  cal:150, pro:5,    carbs:26, fat:2.7, preloaded:true },
  { id:"pre_20", name:"Proteína whey",              unit:"scoop (32g)",    cal:120, pro:24,   carbs:3,  fat:1.5, preloaded:true },
  { id:"pre_21", name:"Queso panela light",         unit:"porción (60g)",  cal:90,  pro:9,    carbs:2,  fat:5,   preloaded:true },
  { id:"pre_22", name:"Pescado blanco (180g)",      unit:"porción",        cal:180, pro:38,   carbs:0,  fat:2.4, preloaded:true },
  { id:"pre_23", name:"Filete de res (170g)",       unit:"porción",        cal:250, pro:36,   carbs:0,  fat:11,  preloaded:true },
  { id:"pre_24", name:"Garbanzos cocidos (100g)",   unit:"porción",        cal:164, pro:8.9,  carbs:27, fat:2.6, preloaded:true },
  { id:"pre_25", name:"Lentejas cocidas (100g)",    unit:"porción",        cal:116, pro:9,    carbs:20, fat:0.4, preloaded:true },
  { id:"pre_26", name:"Edamames sin vaina (70g)",   unit:"porción",        cal:95,  pro:9.2,  carbs:7.6,fat:4.2, preloaded:true },
  { id:"pre_27", name:"Quinoa cocida (110g)",       unit:"porción",        cal:143, pro:5.3,  carbs:25, fat:2.3, preloaded:true },
  { id:"pre_28", name:"Mix de frutos rojos (100g)", unit:"porción",        cal:52,  pro:0.7,  carbs:12, fat:0.3, preloaded:true },
  { id:"pre_29", name:"Almendras (10g)",            unit:"porción",        cal:58,  pro:2.1,  carbs:2,  fat:5,   preloaded:true },
  { id:"pre_30", name:"Plátano",                    unit:"pieza",          cal:89,  pro:1.1,  carbs:23, fat:0.3, preloaded:true },
  { id:"pre_31", name:"Manzana",                    unit:"pieza",          cal:72,  pro:0.4,  carbs:19, fat:0.2, preloaded:true },
  { id:"pre_32", name:"Galletas Salmas",            unit:"paquete",        cal:130, pro:2,    carbs:19, fat:5,   preloaded:true },
  { id:"pre_33", name:"Aceite de oliva",            unit:"cdita (5ml)",    cal:40,  pro:0,    carbs:0,  fat:4.5, preloaded:true },
  { id:"pre_34", name:"Barra proteína Kirkland",    unit:"barra",          cal:190, pro:21,   carbs:21, fat:7,   preloaded:true },
];

const DEFAULT_GOALS = { cal:2000, pro:180, carbs:170, fat:35 };
const DEFAULT_NAMES = ["Desayuno","Colación AM","Comida","Colación PM","Cena"];
const ACCENT = [
  { dot:"#34d399", ring:"#059669", hex:"#059669" },
  { dot:"#60a5fa", ring:"#2563eb", hex:"#2563eb" },
  { dot:"#a78bfa", ring:"#7c3aed", hex:"#7c3aed" },
  { dot:"#fbbf24", ring:"#d97706", hex:"#d97706" },
  { dot:"#f87171", ring:"#dc2626", hex:"#dc2626" },
  { dot:"#fb923c", ring:"#ea580c", hex:"#ea580c" },
];

const ls = {
  get:(k,fb)=>{ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):fb; }catch{ return fb; } },
  set:(k,v) =>{ try{ localStorage.setItem(k,JSON.stringify(v)); }catch{} },
};
const calcTotals = items => items.reduce(
  (a,i)=>({ cal:a.cal+i.cal*i.qty, pro:a.pro+i.pro*i.qty, carbs:a.carbs+i.carbs*i.qty, fat:a.fat+i.fat*i.qty }),
  { cal:0,pro:0,carbs:0,fat:0 }
);
const fmt = n => Math.round(n*10)/10;

const loadH2C = () => new Promise((res,rej) => {
  if (window.html2canvas) { res(window.html2canvas); return; }
  const s = document.createElement("script");
  s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
  s.onload = () => res(window.html2canvas);
  s.onerror = rej;
  document.head.appendChild(s);
});

// ── Export layout (fondo blanco) ─────────────────────────────────────────────
function PlanLayout({ meals, goals, config }) {
  const day = meals.reduce((a,m)=>{ const t=calcTotals(m.items); return {cal:a.cal+t.cal,pro:a.pro+t.pro,carbs:a.carbs+t.carbs,fat:a.fat+t.fat}; },{cal:0,pro:0,carbs:0,fat:0});
  const today = new Date().toLocaleDateString("es-MX",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
  const cap = s => s.charAt(0).toUpperCase()+s.slice(1);

  return (
    <div style={{fontFamily:"Arial,sans-serif",color:"#18181b",background:"#fff",padding:"32px 36px",width:"100%",boxSizing:"border-box"}}>
      {/* header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20,paddingBottom:16,borderBottom:"2px solid #e4e4e7"}}>
        <div>
          <div style={{fontSize:22,fontWeight:700,letterSpacing:-0.5}}>
            <span style={{color:"#059669"}}>macro</span>builder
          </div>
          {config.name&&<div style={{fontSize:12,color:"#71717a",marginTop:3}}>Plan de {config.name}</div>}
        </div>
        <div style={{fontSize:11,color:"#a1a1aa",textAlign:"right",paddingTop:4}}>{cap(today)}</div>
      </div>

      {/* resumen */}
      <div style={{background:"#f4f4f5",borderRadius:10,padding:"16px 20px",marginBottom:20}}>
        <div style={{fontSize:10,fontWeight:700,color:"#71717a",letterSpacing:1.2,textTransform:"uppercase",marginBottom:12}}>Resumen del día</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:14}}>
          {[["Calorías",day.cal,"kcal","#18181b"],["Proteína",day.pro,"g","#059669"],["Carbs",day.carbs,"g","#2563eb"],["Grasa",day.fat,"g","#d97706"]].map(([l,v,u,c])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:700,color:c}}>{fmt(v)}<span style={{fontSize:10,color:"#a1a1aa",fontWeight:400,marginLeft:2}}>{u}</span></div>
              <div style={{fontSize:10,color:"#a1a1aa",marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
        {[["Calorías",day.cal,goals.cal,"#71717a"],["Proteína",day.pro,goals.pro,"#059669"],["Carbohidratos",day.carbs,goals.carbs,"#2563eb"],["Grasa",day.fat,goals.fat,"#d97706"]].map(([l,v,g,c])=>(
          <div key={l} style={{marginBottom:7}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#71717a",marginBottom:2}}>
              <span>{l}</span><span>{fmt(v)} / {g}</span>
            </div>
            <div style={{background:"#e4e4e7",borderRadius:3,height:5,overflow:"hidden"}}>
              <div style={{width:`${Math.min((v/g)*100,100)}%`,background:v>g?"#ef4444":c,height:"100%"}} />
            </div>
          </div>
        ))}
      </div>

      {/* comidas */}
      {meals.map((meal,idx)=>{
        if (!meal.items.length) return null;
        const t=calcTotals(meal.items);
        const ac=ACCENT[idx%ACCENT.length];
        return (
          <div key={idx} style={{borderRadius:10,border:"1px solid #e4e4e7",overflow:"hidden",marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 16px",background:"#f9fafb",borderBottom:"1px solid #e4e4e7"}}>
              <div style={{display:"flex",alignItems:"center",gap:7}}>
                <div style={{width:7,height:7,borderRadius:"50%",background:ac.hex,flexShrink:0}} />
                <span style={{fontWeight:700,fontSize:13}}>{meal.name}</span>
              </div>
              <span style={{fontSize:12,fontWeight:700,color:ac.hex}}>{fmt(t.cal)} kcal</span>
            </div>
            {meal.items.map((item,ii)=>{
              const ic={cal:item.cal*item.qty,pro:item.pro*item.qty,carbs:item.carbs*item.qty,fat:item.fat*item.qty};
              return (
                <div key={item.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 16px",fontSize:12,borderBottom:ii<meal.items.length-1?"1px solid #f4f4f5":"none"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{color:"#71717a",fontWeight:700,minWidth:22,textAlign:"right"}}>×{item.qty}</span>
                    <span style={{color:"#3f3f46"}}>{item.name}</span>
                    <span style={{color:"#a1a1aa",fontSize:10}}>({item.unit})</span>
                  </div>
                  <div style={{display:"flex",gap:10,fontSize:11}}>
                    <span style={{fontWeight:700,color:"#18181b"}}>{fmt(ic.cal)} kcal</span>
                    <span style={{color:"#059669"}}>{fmt(ic.pro)}P</span>
                    <span style={{color:"#2563eb"}}>{fmt(ic.carbs)}C</span>
                    <span style={{color:"#d97706"}}>{fmt(ic.fat)}G</span>
                  </div>
                </div>
              );
            })}
            <div style={{display:"flex",gap:14,justifyContent:"flex-end",padding:"7px 16px",background:"#f9fafb",borderTop:"1px solid #e4e4e7",fontSize:11}}>
              {[["P",t.pro,"#059669"],["C",t.carbs,"#2563eb"],["G",t.fat,"#d97706"]].map(([l,v,c])=>(
                <span key={l} style={{color:c,fontWeight:700}}>{l}: {fmt(v)}g</span>
              ))}
            </div>
          </div>
        );
      })}

      <div style={{marginTop:20,paddingTop:12,borderTop:"1px solid #e4e4e7",display:"flex",justifyContent:"space-between",fontSize:10,color:"#d4d4d8"}}>
        <span>macrobuilder · plan nutricional</span>
        <span>Objetivo: {goals.cal} kcal · {goals.pro}P · {goals.carbs}C · {goals.fat}G</span>
      </div>
    </div>
  );
}

// ── Export Modal ─────────────────────────────────────────────────────────────
function ExportModal({ meals, goals, config, onClose }) {
  const previewRef = useRef(null);
  // "idle" | "rendering" | "ready" | "error"
  const [imgState, setImgState] = useState("idle");
  const [imgSrc,   setImgSrc]   = useState(null);
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

  const generateImage = async () => {
    if (!previewRef.current) return;
    setImgState("rendering");
    setImgSrc(null);
    try {
      const h2c = await loadH2C();
      const el  = previewRef.current;
      const canvas = await h2c(el, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        logging: false,
        windowWidth: el.scrollWidth,
        windowHeight: el.scrollHeight,
      });
      setImgSrc(canvas.toDataURL("image/png"));
      setImgState("ready");
    } catch(e) {
      console.error(e);
      setImgState("error");
    }
  };

  const Btn = ({ onClick, children, style={} }) => (
    <button onClick={onClick} style={{
      display:"flex", alignItems:"center", gap:6, padding:"10px 18px",
      borderRadius:10, border:"1px solid #3f3f46", background:"#27272a",
      color:"#e4e4e7", fontSize:13, fontWeight:600, cursor:"pointer",
      fontFamily:"inherit", ...style,
    }}>{children}</button>
  );

  return (
    <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.9)",display:"flex",flexDirection:"column",overflowY:"auto"}}
      onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>

      {/* top bar */}
      <div style={{position:"sticky",top:0,zIndex:10,background:"#18181b",borderBottom:"1px solid #27272a",padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <span style={{fontSize:13,fontWeight:600,color:"#e4e4e7"}}>Plan del día</span>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>

          {/* IMPRIMIR */}
          <div style={{position:"relative",display:"inline-block"}}>
            <Btn onClick={()=>{
              // scroll preview into view and tell user Ctrl+P
              previewRef.current?.scrollIntoView({behavior:"smooth"});
              alert("Usa Ctrl+P (Mac: Cmd+P) para imprimir.\nEl navegador imprimirá la vista que ves en pantalla.");
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
              </svg>
              Imprimir
            </Btn>
          </div>

          {/* GENERAR IMAGEN */}
          <Btn onClick={generateImage} style={{background: imgState==="ready"?"#064e3b":"#27272a", borderColor: imgState==="ready"?"#059669":"#3f3f46"}}>
            {imgState==="rendering"
              ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{animation:"spin 1s linear infinite"}}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            }
            {imgState==="rendering"?"Generando…": imgState==="ready"?"Regenerar imagen":"Generar imagen PNG"}
          </Btn>

          <button onClick={onClose} style={{width:32,height:32,borderRadius:"50%",background:"#3f3f46",border:"none",color:"#a1a1aa",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>×</button>
        </div>
      </div>

      {/* imagen generada */}
      {imgState==="ready" && imgSrc && (
        <div style={{background:"#059669",padding:"12px 16px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",gap:16}}>
          <p style={{margin:0,color:"#fff",fontSize:12,fontWeight:600}}>
            {isMobile ? "Mantén presionada la imagen para guardar" : "Imagen lista:"}
          </p>
          {!isMobile && (
            <a href={imgSrc} download={`plan-${new Date().toISOString().split("T")[0]}.png`}
              style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:8,background:"#fff",color:"#059669",fontSize:12,fontWeight:700,textDecoration:"none"}}>
              ⬇ Descargar PNG
            </a>
          )}
        </div>
      )}
      {imgState==="error" && (
        <div style={{background:"#7f1d1d",padding:"10px 16px",flexShrink:0}}>
          <p style={{margin:0,color:"#fca5a5",fontSize:12,textAlign:"center"}}>No se pudo generar la imagen. Toma un screenshot manual.</p>
        </div>
      )}

      {/* imagen resultado */}
      {imgState==="ready" && imgSrc && (
        <div style={{display:"flex",justifyContent:"center",padding:"16px",flexShrink:0,background:"#111"}}>
          <img src={imgSrc} alt="Plan del día"
            style={{maxWidth:"100%",borderRadius:12,boxShadow:"0 20px 60px rgba(0,0,0,0.6)",cursor:"pointer"}}
            title={isMobile?"Mantén presionado para guardar":"Clic derecho → Guardar imagen como"}
          />
        </div>
      )}

      {/* preview del layout (siempre visible) */}
      <div style={{display:"flex",justifyContent:"center",padding:"16px",paddingBottom:40}}>
        <div ref={previewRef} style={{width:"100%",maxWidth:680,background:"#fff",borderRadius:14,overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,0.5)"}}>
          <PlanLayout meals={meals} goals={goals} config={config} />
        </div>
      </div>
    </div>
  );
}

// ── Chip ─────────────────────────────────────────────────────────────────────
function Chip({ item, accent, onRemove, onQty }) {
  return (
    <span style={{borderColor:accent.ring+"77",background:accent.ring+"20"}}
      className="inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium text-zinc-200 select-none">
      <span className="max-w-[90px] truncate" title={item.name}>{item.name}</span>
      <button onClick={()=>onQty(Math.max(1,item.qty-1))} className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">−</button>
      <span className="font-mono w-4 text-center text-[11px]" style={{color:accent.dot}}>{item.qty}</span>
      <button onClick={()=>onQty(item.qty+1)} className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">+</button>
      <button onClick={onRemove} className="ml-0.5 opacity-40 hover:opacity-100 transition-opacity">×</button>
    </span>
  );
}

function GoalBar({ label, value, goal, color }) {
  const pct=Math.min((value/goal)*100,100), over=value>goal;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-mono">
        <span className="text-zinc-400">{label}</span>
        <span className={over?"text-red-400":"text-zinc-300"}>{fmt(value)}<span className="text-zinc-600"> / {goal}</span></span>
      </div>
      <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{width:`${pct}%`,background:over?"#ef4444":color}} />
      </div>
    </div>
  );
}

function MealCard({ meal, accent, allIngredients, onUpdate }) {
  const [q,setQ]=useState(""); const inputRef=useRef(null);
  const suggestions=q.length>=1?allIngredients.filter(d=>d.name.toLowerCase().includes(q.toLowerCase())&&!meal.items.find(i=>i.id===d.id)).slice(0,8):[];
  const add=d=>{ onUpdate([...meal.items,{...d,qty:1}]); setQ(""); inputRef.current?.focus(); };
  const remove=id=>onUpdate(meal.items.filter(i=>i.id!==id));
  const setQty=(id,q)=>onUpdate(meal.items.map(i=>i.id===id?{...i,qty:q}:i));
  const t=calcTotals(meal.items);
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{background:accent.dot}} />
          <span className="text-sm font-semibold text-zinc-100">{meal.name}</span>
        </div>
        {meal.items.length>0&&<span className="text-xs font-mono" style={{color:accent.dot}}>{Math.round(t.cal)} kcal</span>}
      </div>
      <div className="px-4 pt-3 flex flex-wrap gap-1.5 min-h-[2.5rem]">
        {meal.items.map(item=>(
          <Chip key={item.id} item={item} accent={accent} onRemove={()=>remove(item.id)} onQty={qty=>setQty(item.id,qty)} />
        ))}
      </div>
      <div className="px-4 pt-2 pb-3 relative">
        <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)} placeholder="+ Agregar ingrediente…"
          className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-500 transition-colors"/>
        {suggestions.length>0&&(
          <div className="absolute left-4 right-4 bg-zinc-800 border border-zinc-600 rounded-xl shadow-2xl overflow-hidden" style={{top:"100%",marginTop:4,zIndex:9999}}>
            {suggestions.map(d=>(
              <button key={d.id} onMouseDown={e=>{e.preventDefault();add(d);}}
                className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-zinc-700 transition-colors text-left border-b border-zinc-700/40 last:border-0">
                <div className="min-w-0 mr-2">
                  <span className="text-sm text-zinc-100">{d.name}</span>
                  <span className="ml-2 text-xs text-zinc-500 whitespace-nowrap">/ {d.unit}</span>
                </div>
                <div className="text-xs font-mono flex gap-2 text-zinc-400 flex-shrink-0">
                  <span>{d.cal} kcal</span><span style={{color:"#34d399"}}>{d.pro}P</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      {meal.items.length>0&&(
        <div className="px-4 pb-3 pt-1 border-t border-zinc-800/60 grid grid-cols-3 gap-1">
          {[["Proteína",t.pro,"#34d399"],["Carbs",t.carbs,"#60a5fa"],["Grasa",t.fat,"#fbbf24"]].map(([l,v,c])=>(
            <div key={l} className="text-center">
              <div className="text-sm font-bold font-mono" style={{color:c}}>{fmt(v)}g</div>
              <div className="text-[10px] text-zinc-600">{l}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NutricionTab({ meals, goals, config, allIngredients, onUpdateMeal, onExport }) {
  const day=meals.reduce((a,m)=>{ const t=calcTotals(m.items); return {cal:a.cal+t.cal,pro:a.pro+t.pro,carbs:a.carbs+t.carbs,fat:a.fat+t.fat}; },{cal:0,pro:0,carbs:0,fat:0});
  const hasData=meals.some(m=>m.items.length>0);
  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-200 tracking-wide">Objetivo del día</h2>
          <button onClick={onExport} disabled={!hasData}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${hasData?"bg-emerald-700 border-emerald-600 text-white hover:bg-emerald-600 cursor-pointer":"bg-zinc-900 border-zinc-800 text-zinc-700 cursor-not-allowed"}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Exportar plan
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2 pb-4 border-b border-zinc-800">
          {[["Calorías",day.cal,"kcal","#e4e4e7"],["Proteína",day.pro,"g","#34d399"],["Carbs",day.carbs,"g","#60a5fa"],["Grasa",day.fat,"g","#fbbf24"]].map(([l,v,u,c])=>(
            <div key={l} className="text-center">
              <div className="text-xl font-bold font-mono" style={{color:c}}>{fmt(v)}<span className="text-[10px] font-normal text-zinc-600 ml-0.5">{u}</span></div>
              <div className="text-[10px] text-zinc-600 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <GoalBar label="Calorías"       value={day.cal}   goal={goals.cal}   color="#71717a"/>
          <GoalBar label="Proteína"       value={day.pro}   goal={goals.pro}   color="#34d399"/>
          <GoalBar label="Carbohidratos"  value={day.carbs} goal={goals.carbs} color="#60a5fa"/>
          <GoalBar label="Grasa"          value={day.fat}   goal={goals.fat}   color="#fbbf24"/>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {meals.map((meal,idx)=>(
          <MealCard key={idx} meal={meal} accent={ACCENT[idx%ACCENT.length]}
            allIngredients={allIngredients} onUpdate={items=>onUpdateMeal(idx,items)}/>
        ))}
      </div>
      {!hasData&&<p className="text-center text-xs text-zinc-700 pb-2">Agrega ingredientes para habilitar la exportación</p>}
    </div>
  );
}

const EMPTY_FORM={name:"",unit:"",cal:"",pro:"",carbs:"",fat:""};
function IngredientesTab({ ingredients, onUpdate }) {
  const [search,setSearch]=useState(""); const [form,setForm]=useState(EMPTY_FORM);
  const [editId,setEditId]=useState(null); const [showForm,setShowForm]=useState(false);
  const filtered=ingredients.filter(i=>i.name.toLowerCase().includes(search.toLowerCase()));
  const startEdit=ing=>{ setForm({name:ing.name,unit:ing.unit,cal:ing.cal,pro:ing.pro,carbs:ing.carbs,fat:ing.fat}); setEditId(ing.id); setShowForm(true); };
  const cancel=()=>{ setShowForm(false); setEditId(null); setForm(EMPTY_FORM); };
  const handleSave=()=>{
    if (!form.name.trim()||!form.unit.trim()) return;
    const e={id:editId??`c_${Date.now()}`,name:form.name.trim(),unit:form.unit.trim(),cal:Number(form.cal)||0,pro:Number(form.pro)||0,carbs:Number(form.carbs)||0,fat:Number(form.fat)||0,preloaded:false};
    onUpdate(editId?ingredients.map(i=>i.id===editId?e:i):[...ingredients,e]); cancel();
  };
  const F=({label,k,type="text",placeholder=""})=>(
    <div className="space-y-1">
      <label className="text-xs text-zinc-500">{label}</label>
      <input type={type} value={form[k]} placeholder={placeholder} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-500 transition-colors font-mono"/>
    </div>
  );
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar ingrediente…"
          className="flex-1 bg-zinc-800/60 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-500 transition-colors"/>
        {!showForm&&<button onClick={()=>{setForm(EMPTY_FORM);setEditId(null);setShowForm(true);}} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors whitespace-nowrap">+ Nuevo</button>}
      </div>
      {showForm&&(
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-zinc-200">{editId?"Editar":"Nuevo ingrediente"}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2"><F label="Nombre" k="name" placeholder="ej. Arroz integral cocido"/></div>
            <div className="col-span-2 sm:col-span-1"><F label="Unidad" k="unit" placeholder="ej. porción, pieza"/></div>
            <F label="Calorías (kcal)" k="cal" type="number"/>
            <F label="Proteína (g)" k="pro" type="number"/>
            <F label="Carbohidratos (g)" k="carbs" type="number"/>
            <F label="Grasas (g)" k="fat" type="number"/>
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors">{editId?"Guardar cambios":"Agregar"}</button>
            <button onClick={cancel} className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm transition-colors">Cancelar</button>
          </div>
        </div>
      )}
      <div className="space-y-2">
        {filtered.length===0&&<div className="text-center py-10 text-zinc-600 text-sm">No se encontraron ingredientes</div>}
        {filtered.map(ing=>(
          <div key={ing.id} className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 group">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-zinc-100 font-medium">{ing.name}</span>
                {ing.preloaded&&<span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-600 border border-zinc-700">precargado</span>}
              </div>
              <span className="text-xs text-zinc-600">/ {ing.unit}</span>
            </div>
            <div className="hidden sm:flex gap-3 text-xs font-mono flex-shrink-0">
              <span className="text-zinc-400">{ing.cal} kcal</span>
              <span style={{color:"#34d399"}}>{ing.pro}P</span>
              <span style={{color:"#60a5fa"}}>{ing.carbs}C</span>
              <span style={{color:"#fbbf24"}}>{ing.fat}G</span>
            </div>
            <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={()=>startEdit(ing)} className="w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors text-sm">✎</button>
              <button onClick={()=>{ if(window.confirm("¿Eliminar?")) onUpdate(ingredients.filter(i=>i.id!==ing.id)); }} className="w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-red-900/60 text-zinc-400 hover:text-red-400 transition-colors">×</button>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-zinc-700 text-center pb-2">{ingredients.length} ingredientes</p>
    </div>
  );
}

function ConfiguracionTab({ goals,config,meals,onGoals,onConfig,onMeals }) {
  const [lg,setLg]=useState(goals); const [lc,setLc]=useState(config); const [saved,setSaved]=useState(false);
  const save=()=>{
    onGoals(lg); onConfig(lc);
    const n=lc.mealCount;
    if(n!==meals.length){
      const names=["Desayuno","Colación AM","Comida","Colación PM","Cena","Extra"];
      onMeals(n>meals.length?[...meals,...Array.from({length:n-meals.length},(_,i)=>({name:names[meals.length+i]??`Comida ${meals.length+i+1}`,items:[]}))]:meals.slice(0,n));
    }
    setSaved(true); setTimeout(()=>setSaved(false),2500);
  };
  return (
    <div className="space-y-5 max-w-lg">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-zinc-200">Perfil</h2>
        <div className="space-y-1">
          <label className="text-xs text-zinc-500">Tu nombre</label>
          <input value={lc.name} onChange={e=>setLc(c=>({...c,name:e.target.value}))} placeholder="ej. Carlos"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-500 transition-colors"/>
        </div>
        <div className="space-y-2">
          <label className="text-xs text-zinc-500">Número de comidas al día</label>
          <div className="flex gap-2">
            {[3,4,5,6].map(n=>(
              <button key={n} onClick={()=>setLc(c=>({...c,mealCount:n}))}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors border ${lc.mealCount===n?"bg-emerald-600 border-emerald-500 text-white":"bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200"}`}>{n}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-zinc-200">Objetivos diarios</h2>
          <p className="text-xs text-zinc-600 mt-0.5">Pide estos números a tu nutriólogo.</p>
        </div>
        {[["Calorías","cal","kcal","#e4e4e7"],["Proteína","pro","g","#34d399"],["Carbohidratos","carbs","g","#60a5fa"],["Grasas","fat","g","#fbbf24"]].map(([label,key,unit,color])=>(
          <div key={key} className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:color}}/>
            <label className="text-sm text-zinc-300 flex-1">{label}</label>
            <input type="number" value={lg[key]} onChange={e=>setLg(g=>({...g,[key]:Number(e.target.value)}))}
              className="w-24 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm font-mono text-right text-zinc-100 outline-none focus:border-zinc-500 transition-colors"/>
            <span className="text-xs text-zinc-600 w-7">{unit}</span>
          </div>
        ))}
      </div>
      <div className="bg-zinc-900 border border-zinc-800/50 rounded-2xl p-5 opacity-50">
        <h2 className="text-sm font-semibold text-zinc-400">Próximamente</h2>
        <ul className="mt-2 space-y-1 text-xs text-zinc-600">
          <li>· Plan del nutriólogo precargado</li>
          <li>· Historial de días anteriores</li>
          <li>· Tab de entrenamiento</li>
          <li>· Generador de recetas con IA</li>
        </ul>
      </div>
      <button onClick={save}
        className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 ${saved?"bg-zinc-800 text-emerald-400 border border-emerald-700":"bg-emerald-600 hover:bg-emerald-500 text-white"}`}>
        {saved?"✓ Guardado":"Guardar configuración"}
      </button>
    </div>
  );
}

const TABS=[{id:"nutricion",label:"Nutrición"},{id:"ingredientes",label:"Ingredientes"},{id:"configuracion",label:"Configuración"}];

export default function App() {
  const [tab,setTab]=useState("nutricion");
  const [ingredients,setIngredients]=useState(()=>ls.get("mb_ingredients",PRELOADED));
  const [meals,setMeals]=useState(()=>ls.get("mb_meals",DEFAULT_NAMES.map(name=>({name,items:[]}))));
  const [goals,setGoals]=useState(()=>ls.get("mb_goals",DEFAULT_GOALS));
  const [config,setConfig]=useState(()=>ls.get("mb_config",{name:"",mealCount:5}));
  const [showExport,setShowExport]=useState(false);

  useEffect(()=>ls.set("mb_ingredients",ingredients),[ingredients]);
  useEffect(()=>ls.set("mb_meals",meals),[meals]);
  useEffect(()=>ls.set("mb_goals",goals),[goals]);
  useEffect(()=>ls.set("mb_config",config),[config]);

  const updateMeal=(idx,items)=>setMeals(prev=>prev.map((m,i)=>i===idx?{...m,items}:m));

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-16" style={{fontFamily:"'DM Sans',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>

      {showExport&&<ExportModal meals={meals} goals={goals} config={config} onClose={()=>setShowExport(false)}/>}

      <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur border-b border-zinc-800/70">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between pt-3 pb-2">
            <span className="text-lg font-bold tracking-tight">
              <span style={{color:"#34d399"}}>macro</span>builder
              {config.name&&<span className="text-zinc-500 text-sm font-normal ml-2 hidden sm:inline">· {config.name}</span>}
            </span>
            {tab==="nutricion"&&<span className="text-xs text-zinc-600 font-mono">{Math.round(meals.reduce((a,m)=>a+calcTotals(m.items).cal,0))} / {goals.cal} kcal</span>}
          </div>
          <div className="flex">
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)}
                className={`px-4 py-2 text-sm font-medium transition-all border-b-2 ${tab===t.id?"text-zinc-100 border-emerald-400":"text-zinc-500 border-transparent hover:text-zinc-300 hover:border-zinc-600"}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {tab==="nutricion"&&<NutricionTab meals={meals} goals={goals} config={config} allIngredients={ingredients} onUpdateMeal={updateMeal} onExport={()=>setShowExport(true)}/>}
        {tab==="ingredientes"&&<IngredientesTab ingredients={ingredients} onUpdate={setIngredients}/>}
        {tab==="configuracion"&&<ConfiguracionTab goals={goals} config={config} meals={meals} onGoals={setGoals} onConfig={setConfig} onMeals={setMeals}/>}
      </main>
    </div>
  );
}
