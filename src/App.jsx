import { useState, useEffect, useRef } from "react";

const C = {
  dark: "#151A14",
  green1: "#1B3A2D",
  green2: "#2D4A3E",
  green3: "#3A5F4F",
  gold: "#C8A35A",
  goldMuted: "#B89A5C",
  goldLight: "#D4B876",
  cream: "#FAF8F4",
  white: "#FFFFFF",
  text: "#1A1A1A",
  textSoft: "#4A4A4A",
  textMuted: "#7A7A7A",
  border: "#E8E4DC",
  borderLight: "#F0ECE4",
};

const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

const serif = { fontFamily: "'Instrument Serif', Georgia, serif" };
const sans = { fontFamily: "'DM Sans', system-ui, sans-serif" };

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.12 });
    ref.current && obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function Counter({ end, suffix = "", duration = 2200, format }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const ran = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ran.current) {
        ran.current = true;
        const t0 = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - t0) / duration, 1);
          setVal(Math.floor((1 - Math.pow(1 - p, 3)) * end));
          p < 1 && requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    ref.current && obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  const display = format ? format(val) : (end >= 1000000 ? (val / 1000000).toFixed(1).replace(".", ",") + "M" : val);
  return <span ref={ref}>{display}{suffix}</span>;
}

function Marquee() {
  const items = ["Escritórios de advocacia", "Departamentos jurídicos", "Consultorias tributárias", "Contadores e auditores", "Procuradorias", "Escritórios de advocacia", "Departamentos jurídicos", "Consultorias tributárias", "Contadores e auditores", "Procuradorias"];
  return (
    <div style={{ overflow: "hidden", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "28px 0", background: C.white }}>
      <div style={{ display: "flex", gap: 60, animation: "marquee 30s linear infinite", width: "max-content" }}>
        {items.map((l, i) => (
          <span key={i} style={{ ...sans, fontSize: 13, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", color: C.textMuted, whiteSpace: "nowrap", opacity: 0.6 }}>{l}</span>
        ))}
      </div>
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: scrolled ? "14px 48px" : "22px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(250,248,244,0.92)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", transition: "all 0.4s ease", borderBottom: scrolled ? `1px solid ${C.border}` : "none" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: C.green1, display: "flex", alignItems: "center", justifyContent: "center", ...serif, fontWeight: 400, fontSize: 20, color: C.gold }}>F</div>
        <div>
          <div style={{ ...serif, fontSize: 19, color: scrolled ? C.text : C.green1, lineHeight: 1.1 }}>Faro Tributário</div>
          <div style={{ ...sans, fontSize: 9, fontWeight: 600, letterSpacing: 2.5, color: C.gold, textTransform: "uppercase" }}>Inteligência Jurídica</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        {["Soluções", "Cobertura", "Sobre"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} style={{ ...sans, color: scrolled ? C.textSoft : C.green2, textDecoration: "none", fontSize: 14, fontWeight: 400, transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.target.style.color = C.gold)} onMouseLeave={(e) => (e.target.style.color = scrolled ? C.textSoft : C.green2)}>{item}</a>
        ))}
        <a href="https://faro-app-756887985367.southamerica-east1.run.app/" style={{ ...sans, color: C.textSoft, textDecoration: "none", fontSize: 14, fontWeight: 400 }}>Login</a>
        <a href="https://faro-app-756887985367.southamerica-east1.run.app/" style={{ ...sans, padding: "10px 24px", background: C.green1, color: C.white, borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: "none", transition: "all 0.25s", letterSpacing: 0.2 }}
          onMouseEnter={(e) => (e.target.style.background = C.green2)} onMouseLeave={(e) => (e.target.style.background = C.green1)}>
          Solicitar demonstração
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "160px 48px 100px", background: C.cream, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: 900, height: 900, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,163,90,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <Reveal delay={0.08}>
        <h1 style={{ ...serif, fontSize: 72, fontWeight: 400, color: C.green1, lineHeight: 1.08, margin: "0 0 28px", maxWidth: 820, letterSpacing: -1 }}>
          Pesquisa jurisprudencial com{" "}
          <em style={{ color: C.gold, fontStyle: "italic" }}>inteligência artificial</em>
        </h1>
      </Reveal>

      <Reveal delay={0.16}>
        <p style={{ ...sans, fontSize: 19, lineHeight: 1.7, color: C.textMuted, margin: "0 auto 48px", maxWidth: 580, fontWeight: 300 }}>
          Busca semântica, jurimetria e assistente com IA em todos os tribunais do Brasil. Encontre decisões por significado, não por palavras-chave.
        </p>
      </Reveal>

      <Reveal delay={0.24}>
        <div style={{ display: "flex", gap: 14 }}>
          <a href="https://faro-app-756887985367.southamerica-east1.run.app/" style={{ ...sans, padding: "16px 40px", background: C.green1, color: C.white, borderRadius: 10, fontSize: 15, fontWeight: 500, textDecoration: "none", transition: "all 0.3s", letterSpacing: 0.2 }}
            onMouseEnter={(e) => { e.target.style.background = C.green2; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.target.style.background = C.green1; e.target.style.transform = "translateY(0)"; }}>
            Solicitar demonstração
          </a>
          <a href="#solucoes" style={{ ...sans, padding: "16px 32px", background: "transparent", color: C.textSoft, border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 15, fontWeight: 400, textDecoration: "none", transition: "all 0.3s" }}
            onMouseEnter={(e) => { e.target.style.borderColor = C.gold; e.target.style.color = C.green1; }}
            onMouseLeave={(e) => { e.target.style.borderColor = C.border; e.target.style.color = C.textSoft; }}>
            Conhecer a plataforma
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.35} style={{ marginTop: 80, width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 1, maxWidth: 720, margin: "0 auto", background: C.border, borderRadius: 16, overflow: "hidden" }}>
          {[
            { val: 3600000, suf: "+", label: "Documentos indexados", fmt: (v) => (v / 1000000).toFixed(1).replace(".", ",") + "M" },
            { val: 39, suf: "+", label: "Tribunais cobertos" },
            { val: 36, suf: "", label: "Fontes ativas" },
            { val: 5, suf: "", label: "Áreas do Direito" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: C.white, padding: "28px 20px", textAlign: "center" }}>
              <div style={{ ...serif, fontSize: 32, color: C.green1, lineHeight: 1, marginBottom: 6 }}>
                <Counter end={s.val} suffix={s.suf} format={s.fmt} />
              </div>
              <div style={{ ...sans, fontSize: 12.5, color: C.textMuted, fontWeight: 400 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function FeatureRow({ reverse, tag, title, desc, points, accent }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", direction: reverse ? "rtl" : "ltr", padding: "100px 0", borderBottom: `1px solid ${C.borderLight}` }}>
      <Reveal style={{ direction: "ltr" }}>
        <div style={{ maxWidth: 480 }}>
          <span style={{ ...sans, fontSize: 11, fontWeight: 600, letterSpacing: 2.5, textTransform: "uppercase", color: C.gold, display: "block", marginBottom: 16 }}>{tag}</span>
          <h3 style={{ ...serif, fontSize: 38, fontWeight: 400, color: C.green1, lineHeight: 1.15, margin: "0 0 20px" }}>{title}</h3>
          <p style={{ ...sans, fontSize: 16, lineHeight: 1.7, color: C.textMuted, margin: "0 0 32px", fontWeight: 300 }}>{desc}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {points.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 20, height: 20, borderRadius: 6, background: `${C.green1}0D`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.green3} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <span style={{ ...sans, fontSize: 14.5, color: C.textSoft, lineHeight: 1.5, fontWeight: 400 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.15} style={{ direction: "ltr" }}>
        <div style={{ background: `linear-gradient(145deg, ${C.green1}, ${C.green2})`, borderRadius: 20, padding: 48, minHeight: 380, display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at ${reverse ? "20%" : "80%"} 30%, rgba(200,163,90,0.08) 0%, transparent 60%)`, pointerEvents: "none" }} />
          {accent}
        </div>
      </Reveal>
    </div>
  );
}

function Solutions() {
  return (
    <section id="soluções" style={{ padding: "40px 48px 0", maxWidth: 1200, margin: "0 auto" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <span style={{ ...sans, fontSize: 11, fontWeight: 600, letterSpacing: 2.5, textTransform: "uppercase", color: C.gold }}>Soluções</span>
          <h2 style={{ ...serif, fontSize: 46, fontWeight: 400, color: C.green1, margin: "16px 0 0", lineHeight: 1.15 }}>
            Uma plataforma para quem precisa<br />decidir com precisão
          </h2>
        </div>
      </Reveal>

      <FeatureRow
        tag="Pesquisa semântica"
        title="Encontre decisões pelo significado, não por palavras-chave"
        desc="Enquanto ferramentas tradicionais buscam por termos exatos, o Faro Tributário usa inteligência artificial do Google para entender o conceito jurídico por trás da sua pesquisa. O resultado: decisões mais relevantes, em menos tempo."
        points={[
          "Busca por tese, argumento ou conceito jurídico completo",
          "IA treinada para compreender linguagem jurídica brasileira",
          "Filtros por tributo, relator, turma, tribunal e período",
          "Resultados ranqueados por relevância semântica, não por data",
        ]}
        accent={
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "16px 20px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              <span style={{ ...sans, fontSize: 14, color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>exclusão do ICMS da base de PIS/COFINS</span>
            </div>
            <div style={{ ...sans, fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 14 }}>Resultados por relevância semântica</div>
            {[
              { source: "CARF", id: "9303-010.242/2024", score: "98.7%", o: 1 },
              { source: "STJ", id: "REsp 1.861.522/SP", score: "96.2%", o: 0.8 },
              { source: "TRF-4", id: "5001234-20.2024", score: "94.1%", o: 0.6 },
              { source: "TJSP", id: "1023456-78.2025", score: "89.3%", o: 0.4 },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", opacity: r.o }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ ...sans, fontSize: 11, fontWeight: 600, padding: "2px 8px", background: "rgba(200,163,90,0.15)", borderRadius: 4, color: C.goldLight }}>{r.source}</span>
                  <span style={{ ...sans, fontSize: 13, color: C.white, fontWeight: 400 }}>{r.id}</span>
                </div>
                <span style={{ ...sans, fontSize: 12, color: C.gold, fontWeight: 600 }}>{r.score}</span>
              </div>
            ))}
          </div>
        }
      />

      <FeatureRow
        reverse
        tag="Assistente jurídico"
        title="Pergunte em linguagem natural, com respostas do Google AI"
        desc="O assistente jurídico do Faro é alimentado por Gemini, a IA do Google. Faça perguntas complexas sobre jurisprudência e receba análises fundamentadas na nossa base de dados."
        points={[
          "Perguntas em linguagem natural sobre qualquer tese tributária",
          "Respostas fundamentadas em decisões reais da base",
          "Análise de posicionamento por tribunal e período",
          "Powered by Google Gemini — disponível em qualquer tela",
        ]}
        accent={
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ background: "rgba(200,163,90,0.1)", border: "1px solid rgba(200,163,90,0.2)", borderRadius: 12, padding: "14px 18px", marginBottom: 20, marginLeft: 40 }}>
              <span style={{ ...sans, fontSize: 14, color: C.goldLight, fontWeight: 400 }}>Qual a posição do CARF sobre exclusão do ICMS da base de PIS/COFINS?</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "18px 20px", marginRight: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", ...serif, fontSize: 12, color: C.green1, fontWeight: 700 }}>F</div>
                <span style={{ ...sans, fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>Assistente Jurídico</span>
                <span style={{ ...sans, fontSize: 10, color: "rgba(255,255,255,0.25)", marginLeft: 4 }}>Gemini</span>
              </div>
              <div style={{ ...sans, fontSize: 13.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, fontWeight: 300 }}>
                O CARF tem posicionamento majoritariamente favorável ao contribuinte nesta tese, alinhado ao RE 574.706 do STF. A taxa de favorabilidade nos últimos 6 meses...
              </div>
            </div>
          </div>
        }
      />

      <FeatureRow
        tag="Jurimetria"
        title="Dados reais para decisões estratégicas"
        desc="Taxa de favorabilidade por tribunal, turma e relator. Tendências ao longo do tempo. Estatísticas que transformam pesquisa em estratégia processual."
        points={["Taxa de favorabilidade ao contribuinte e à fazenda", "Análise por turma, câmara e relator", "Tendências de 6, 12 e 24 meses", "Dados exportáveis para relatórios"]}
        accent={
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ ...sans, fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.4)", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1.5 }}>Taxa favorável ao contribuinte</div>
            <div style={{ ...serif, fontSize: 56, color: C.gold, lineHeight: 1, marginBottom: 8 }}>72,4%</div>
            <div style={{ ...sans, fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 32 }}>Últimos 6 meses — CARF, 1ª Seção</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
              {[45, 52, 60, 58, 65, 70, 68, 72, 75, 72, 78, 74].map((v, i) => (
                <div key={i} style={{ flex: 1, height: `${v}%`, background: i === 11 ? C.gold : `rgba(200,163,90,${0.15 + i * 0.04})`, borderRadius: 3 }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, ...sans, fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
              <span>Mar 25</span><span>Mar 26</span>
            </div>
          </div>
        }
      />

      <FeatureRow
        reverse
        tag="Monitoramento"
        title="Nunca perca uma decisão relevante"
        desc="Cadastre teses, tributos e relatores de interesse. A plataforma monitora automaticamente e alerta quando novas decisões são publicadas."
        points={["Monitoramento contínuo por tese ou tributo", "Alertas automáticos de novas decisões", "Coleções organizadas por caso ou cliente", "Comparador de posicionamento entre tribunais"]}
        accent={
          <div style={{ position: "relative", zIndex: 2 }}>
            {[
              { title: "ICMS na base de PIS/COFINS", count: "3 novas", time: "há 2h", active: true },
              { title: "Contribuição previdenciária sobre PLR", count: "1 nova", time: "há 5h", active: true },
              { title: "IRPJ sobre variação cambial", count: "—", time: "sem novidades", active: false },
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid rgba(255,255,255,${item.active ? 0.1 : 0.04})`, borderRadius: 12, padding: "18px 20px", marginBottom: i < 2 ? 12 : 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ ...sans, fontSize: 14, color: item.active ? C.white : "rgba(255,255,255,0.35)", fontWeight: 500, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ ...sans, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{item.time}</div>
                </div>
                {item.active && <span style={{ ...sans, fontSize: 12, fontWeight: 600, padding: "4px 12px", background: "rgba(200,163,90,0.15)", border: "1px solid rgba(200,163,90,0.25)", borderRadius: 6, color: C.goldLight }}>{item.count}</span>}
              </div>
            ))}
          </div>
        }
      />
    </section>
  );
}

function WhyFaro() {
  const items = [
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.8" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
      title: "Busca semântica de verdade",
      desc: "Não é busca por palavra-chave com filtro. É IA que entende o conceito jurídico e retorna decisões por relevância real.",
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
      title: "Especialista em tributário",
      desc: "Enquanto plataformas genéricas tentam cobrir tudo, o Faro foi construído do zero para o direito tributário brasileiro.",
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.8" strokeLinecap="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12" /></svg>,
      title: "Infraestrutura Google Cloud",
      desc: "Assistente com Gemini, embeddings de última geração, busca vetorial. Tecnologia enterprise com custo acessível.",
    },
  ];

  return (
    <section style={{ padding: "120px 48px", background: C.cream, borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ ...sans, fontSize: 11, fontWeight: 600, letterSpacing: 2.5, textTransform: "uppercase", color: C.gold }}>Diferenciais</span>
            <h2 style={{ ...serif, fontSize: 46, fontWeight: 400, color: C.green1, margin: "16px 0 0", lineHeight: 1.15 }}>
              Por que o Faro Tributário
            </h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ padding: 36, background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, height: "100%", transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(27,58,45,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${C.green1}0A`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>{item.icon}</div>
                <h4 style={{ ...sans, fontSize: 16, fontWeight: 600, color: C.green1, margin: "0 0 10px" }}>{item.title}</h4>
                <p style={{ ...sans, fontSize: 14, lineHeight: 1.6, color: C.textMuted, margin: 0, fontWeight: 300 }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Coverage() {
  const groups = [
    { name: "Tribunais Superiores", items: ["STF", "STJ"] },
    { name: "Órgãos Administrativos", items: ["CARF", "DRJs", "RFB — Cosit", "CVM"] },
    { name: "Justiça Federal", items: ["TRF-1", "TRF-2", "TRF-3", "TRF-4", "TRF-5", "TRF-6"] },
    { name: "Justiça Estadual — 27 tribunais", items: ["TJAC","TJAL","TJAM","TJAP","TJBA","TJCE","TJDFT","TJES","TJGO","TJMA","TJMG","TJMS","TJMT","TJPA","TJPB","TJPE","TJPI","TJPR","TJRJ","TJRN","TJRO","TJRR","TJRS","TJSC","TJSE","TJSP","TJTO"] },
  ];
  return (
    <section id="cobertura" style={{ padding: "120px 48px", background: C.white, borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ ...sans, fontSize: 11, fontWeight: 600, letterSpacing: 2.5, textTransform: "uppercase", color: C.gold }}>Cobertura Nacional</span>
            <h2 style={{ ...serif, fontSize: 46, fontWeight: 400, color: C.green1, margin: "16px 0 12px", lineHeight: 1.15 }}>Todos os tribunais do Brasil</h2>
            <p style={{ ...sans, fontSize: 17, color: C.textMuted, fontWeight: 300, margin: 0 }}>Atualização diária. 36 fontes ativas. Cobertura nacional completa.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 900, margin: "0 auto" }}>
            {groups.map((g, gi) => (
              <div key={gi}>
                <div style={{ ...sans, fontSize: 11, fontWeight: 600, letterSpacing: 1.8, textTransform: "uppercase", color: C.textMuted, marginBottom: 14 }}>{g.name}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {g.items.map((item) => (
                    <span key={item} style={{ ...sans, padding: "8px 16px", fontSize: 13, fontWeight: 500, background: C.cream, border: `1px solid ${C.border}`, borderRadius: 8, color: C.green1 }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 56, flexWrap: "wrap" }}>
            {[
              { name: "Tributário", active: true },
              { name: "Trabalhista", active: false },
              { name: "Cível", active: false },
              { name: "Empresarial", active: false },
              { name: "Previdenciário", active: false },
            ].map((a) => (
              <div key={a.name} style={{ ...sans, padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 500, background: a.active ? C.green1 : C.cream, color: a.active ? C.white : C.textMuted, border: `1px solid ${a.active ? C.green1 : C.border}`, display: "flex", alignItems: "center", gap: 8 }}>
                {a.name}
                {!a.active && <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", background: "rgba(200,163,90,0.12)", color: C.goldMuted, borderRadius: 4, letterSpacing: 0.5 }}>Em breve</span>}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section id="sobre" style={{ padding: "120px 48px", background: C.cream, borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${C.green1}, ${C.green2})`, display: "flex", alignItems: "center", justifyContent: "center", ...serif, fontSize: 28, color: C.gold }}>
              L
            </div>
          </div>
          <div style={{ ...serif, fontSize: 28, fontWeight: 400, fontStyle: "italic", color: C.green1, lineHeight: 1.5, marginBottom: 28, maxWidth: 640, margin: "0 auto 28px" }}>
            "O advogado tributarista merece uma ferramenta que entenda o que ele está procurando. Construímos o Faro pra isso — busca por significado, não por palavra-chave."
          </div>
          <div style={{ ...sans, fontSize: 15, fontWeight: 600, color: C.green1 }}>Leonardo da Silva</div>
          <div style={{ ...sans, fontSize: 13, color: C.textMuted, marginTop: 4 }}>Sócio, Faro Tributário</div>
        </Reveal>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="demo" style={{ padding: "120px 48px", background: `linear-gradient(165deg, ${C.green1} 0%, ${C.green2} 100%)`, textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,163,90,0.06), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <Reveal>
          <h2 style={{ ...serif, fontSize: 48, fontWeight: 400, color: C.white, margin: "0 0 20px", lineHeight: 1.15 }}>
            Comece a pesquisar com<br /><em style={{ color: C.gold }}>inteligência artificial</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ ...sans, fontSize: 17, color: "rgba(255,255,255,0.55)", margin: "0 auto 40px", maxWidth: 480, fontWeight: 300, lineHeight: 1.7 }}>
            Crie sua conta gratuita e veja como a plataforma transforma a rotina de pesquisa do seu escritório.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <a href="https://faro-app-756887985367.southamerica-east1.run.app/" style={{ ...sans, padding: "16px 44px", background: C.gold, color: C.green1, borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", transition: "all 0.3s", boxShadow: "0 4px 24px rgba(200,163,90,0.25)", letterSpacing: 0.2 }}
              onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 32px rgba(200,163,90,0.35)"; }}
              onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 24px rgba(200,163,90,0.25)"; }}>
              Criar conta gratuita
            </a>
            <a href="https://faro-app-756887985367.southamerica-east1.run.app/" style={{ ...sans, padding: "16px 32px", background: "transparent", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, fontSize: 15, fontWeight: 400, textDecoration: "none", transition: "all 0.3s" }}
              onMouseEnter={(e) => { e.target.style.borderColor = "rgba(200,163,90,0.4)"; e.target.style.color = C.goldLight; }}
              onMouseLeave={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.color = "rgba(255,255,255,0.7)"; }}>
              Solicitar demonstração
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "48px 48px 36px", background: C.dark }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: C.green2, display: "flex", alignItems: "center", justifyContent: "center", ...serif, fontSize: 16, color: C.gold }}>F</div>
          <span style={{ ...serif, fontSize: 15, color: "rgba(255,255,255,0.7)" }}>Faro Tributário</span>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {["Soluções", "Cobertura", "Contato", "Termos", "Privacidade"].map((item) => (
            <a key={item} href="#" style={{ ...sans, fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.target.style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.35)")}>{item}</a>
          ))}
        </div>
        <span style={{ ...sans, fontSize: 12, color: "rgba(255,255,255,0.2)" }}>2026 Faro Tributário</span>
      </div>
    </footer>
  );
}

export default function FaroLanding() {
  return (
    <div style={{ ...sans, color: C.text, background: C.cream, margin: 0, overflowX: "hidden" }}>
      <Nav />
      <Hero />
      <Marquee />
      <Solutions />
      <WhyFaro />
      <Coverage />
      <Founder />
      <CTA />
      <Footer />
    </div>
  );
}
