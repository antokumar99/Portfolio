export function Education({educations}) {
  return (
    <section id="education" className="py-32">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-20">
          Education &amp; Certifications
        </h2>

        {/* Tree timeline */}
        <div className="relative">

          {/* Center spine */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-void-800" />

          <div className="space-y-12">
            {educations.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={item.id} className="relative flex items-center">

                  {/* Center dot */}
                  <div
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10
                                w-10 h-10 rounded-full items-center justify-center
                                border border-void-700/60 bg-void-950"
                    style={{
                      boxShadow: item.current
                        ? "0 0 0 3px rgba(127,255,80,0.2), 0 0 16px rgba(127,255,80,0.15)"
                        : "0 0 0 3px rgba(61,90,255,0.15)",
                    }}
                  >
                    <span className="label-tag text-void-400" style={{ fontSize: "0.55rem" }}>
                      {item.shortName.slice(0, 4)}
                    </span>
                  </div>

                  {/* Left half */}
                  <div className="w-full md:w-1/2 md:pr-14">
                    {isLeft ? (
                      <div className="border border-void-700/30 rounded-sm bg-void-900/40 p-6
                                      hover:border-void-600/50 hover:bg-void-900/60 transition-all duration-300">
                        <CardBody item={item} />
                      </div>
                    ) : (
                      <div className="hidden md:flex justify-end items-center h-full">
                        <span className="label-tag text-void-700">{item.period}</span>
                      </div>
                    )}
                  </div>

                  {/* Right half */}
                  <div className="hidden md:block w-1/2 pl-14">
                    {!isLeft ? (
                      <div className="border border-void-700/30 rounded-sm bg-void-900/40 p-6
                                      hover:border-void-600/50 hover:bg-void-900/60 transition-all duration-300">
                        <CardBody item={item} />
                      </div>
                    ) : (
                      <div className="flex items-center h-full">
                        <span className="label-tag text-void-700">{item.period}</span>
                      </div>
                    )}
                  </div>

                  {/* Horizontal connector */}
                  {isLeft
                    ? <div className="hidden md:block absolute right-1/2 top-1/2 -translate-y-1/2 h-px bg-void-800 w-14" />
                    : <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 h-px bg-void-800 w-14" />
                  }
                </div>
              );
            })}
          </div>

          {/* Mobile fallback */}
          <div className="md:hidden space-y-5 mt-8">
            {educations.map((item) => (
              <div key={`m-${item.id}`}
                className="border border-void-700/30 rounded-sm bg-void-900/40 p-5">
                <CardBody item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Courses tag cloud */}
        <div className="mt-20 p-8 border border-void-700/20 rounded-sm bg-void-900/20">
          
          <div className="flex flex-wrap justify-center gap-2.5">
            {[...new Set(educations.flatMap((e) => e.courses))].map((course) => (
              <span
                key={course}
                className="px-4 py-2 label-tag border border-void-800 text-void-500 rounded-sm
                           hover:border-void-600 hover:text-void-300 transition-all cursor-default"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CardBody({ item }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-3">
        <span className="label-tag text-void-400">{item.period}</span>
        {item.current && (
          <span className="label-tag text-neon-400 border border-neon-400/30
                           px-2 py-0.5 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-400"
              style={{ animation: "pulse 2s infinite" }} />
            Active
          </span>
        )}
      </div>

      <h3 className="text-sm font-semibold text-void-100 leading-snug mb-1">
        {item.degree}
      </h3>

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-void-400 font-medium">{item.institution}</span>
        <span className="label-tag text-void-600">{item.result}</span>
      </div>

      <div className="h-px bg-void-800/60 overflow-hidden mb-1">
        <div
          className="h-full transition-all duration-1000"
          style={{
            width: item.current ? "80%" : "100%",
            background: "linear-gradient(90deg, #3d5aff, #a8ff78)",
          }}
        />
      </div>

      <p className="label-tag text-void-500 mt-2">{item.location}</p>
    </>
  );
}