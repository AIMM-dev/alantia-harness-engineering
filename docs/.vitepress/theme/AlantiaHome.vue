<script setup>
import { withBase } from 'vitepress'
const steps = [
  { range: 'Lecciones 01–04', title: 'Construye las bases', text: 'Entiende el harness y convierte tu repositorio en un entorno que el agente pueda comprender.', link: '/es/lectures/lecture-01-why-capable-agents-still-fail/' },
  { range: 'Lecciones 05–08', title: 'Dale continuidad al trabajo', text: 'Conserva el estado entre sesiones, inicializa el entorno y define límites de ejecución.', link: '/es/lectures/lecture-05-why-long-running-tasks-lose-continuity/' },
  { range: 'Lecciones 09–12', title: 'Exige evidencia', text: 'Verifica los resultados, observa la ejecución y deja cada sesión lista para continuar.', link: '/es/lectures/lecture-09-why-agents-declare-victory-too-early/' },
  { range: 'Lecciones 13–14', title: 'Diseña la autonomía', text: 'Conecta ciclos automáticos, agentes especializados y flujos de trabajo como grafos.', link: '/es/lectures/lecture-13-loop-engineering/' }
]
</script>

<template>
  <div class="alantia-home">
    <section class="course-hero" aria-labelledby="course-title">
      <div class="hero-copy">
        <p class="course-label">Alantia.ai · Ingeniería de agentes</p>
        <h1 id="course-title">Agentes capaces.<br><span>Resultados confiables.</span></h1>
        <p class="hero-description">Aprende Harness Engineering: diseña el contexto, las herramientas y la verificación que convierten la capacidad de un agente de IA en trabajo bien hecho.</p>
        <div class="hero-actions">
          <a class="course-button primary" :href="withBase(steps[0].link)">Empezar a aprender <span aria-hidden="true">↗</span></a>
          <a class="course-button secondary" :href="withBase('/es/projects/')">Explorar los proyectos</a>
        </div>
        <p class="course-details">14 lecciones <span aria-hidden="true">/</span> 8 proyectos prácticos <span aria-hidden="true">/</span> En español</p>
      </div>
      <aside class="harness-map" aria-label="El ciclo de trabajo de un harness">
        <div class="map-heading"><span>Un sistema para trabajar mejor</span><span class="map-status" aria-hidden="true"></span></div>
        <div class="map-context"><span>Contexto y límites</span><code>AGENTS.md</code></div>
        <div class="map-connector" aria-hidden="true">↓</div>
        <div class="map-agent"><img :src="withBase('/brand/mark-manual-dark.png')" alt="" width="28" height="28"><div><strong>El agente ejecuta</strong><span>Una tarea, un objetivo claro.</span></div></div>
        <div class="map-connector" aria-hidden="true">↓</div>
        <div class="map-check"><span>Verificar con evidencia</span><span class="check-icon" aria-hidden="true">✓</span></div>
        <div class="map-feedback"><span aria-hidden="true">↳</span> Si falla, corregir y volver a verificar.</div>
        <div class="map-result"><span>Estado guardado</span><code>Listo para continuar</code></div>
        <p class="map-caption">La confianza se construye en cada ciclo.</p>
      </aside>
    </section>

    <section class="learning-route" aria-labelledby="route-title">
      <div class="section-intro"><h2 id="route-title">De la primera instrucción<br>a un sistema confiable.</h2><p>Avanza en orden o retoma el tema que necesitas. Cada etapa conecta los conceptos con una práctica concreta.</p></div>
      <ol class="route-list">
        <li v-for="(step, index) in steps" :key="step.link"><a :href="withBase(step.link)"><span class="route-number">0{{ index + 1 }}</span><div class="route-content"><span class="route-range">{{ step.range }}</span><h3>{{ step.title }}</h3><p>{{ step.text }}</p></div><span class="route-arrow" aria-hidden="true">↗</span></a></li>
      </ol>
    </section>

    <section class="practice-section" aria-labelledby="practice-title">
      <div><p class="practice-label">Aprender haciendo</p><h2 id="practice-title">Tu repositorio.<br>Tu próximo paso.</h2><p>Aplica lo aprendido a una base de conocimiento de escritorio. Compara resultados, detecta fallos y mejora el entorno del agente con cada proyecto.</p><a class="course-button primary" :href="withBase('/es/projects/')">Ver los 8 proyectos <span aria-hidden="true">↗</span></a></div>
      <div class="resource-links">
        <a :href="withBase('/es/resources/templates/')"><div><h3>Plantillas listas para usar</h3><p>Instrucciones, listas de funciones y registros de sesión.</p></div><span aria-hidden="true">↗</span></a>
        <a :href="withBase('/es/harness-designs/')"><div><h3>Cómo lo hacen otros</h3><p>Analiza los harness de Pi, Claude Code, Codex y DeepSeek.</p></div><span aria-hidden="true">↗</span></a>
        <a :href="withBase('/es/glosario')"><div><h3>Un lenguaje compartido</h3><p>Los términos técnicos que conviene conocer, explicados en español.</p></div><span aria-hidden="true">↗</span></a>
      </div>
    </section>
    <section class="course-signature" aria-label="Alantia: personas, tecnología e impacto"><img :src="withBase('/brand/logo-manual-dark.png')" alt="Alantia" width="150" height="111"><p>People first · amplified by technology · driving business impact</p></section>
    <section class="course-note"><p><strong>Antes de empezar.</strong> Necesitas conocimientos básicos de programación, Git y terminal. Para los proyectos, utiliza un agente capaz de editar archivos y ejecutar comandos.</p><p>Adaptación en español de <a href="https://github.com/walkinglabs/learn-harness-engineering" target="_blank" rel="noopener noreferrer">Learn Harness Engineering, de WalkingLab</a>. El curso original y sus ejemplos se conservan bajo licencia MIT.</p></section>
  </div>
</template>
