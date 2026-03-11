import { Event } from "@/lib/types";

export default function Events({ events }: { events: Event[] }) {
  const activeEvents = events.filter((e) => e.active);

  if (activeEvents.length === 0) return null;

  return (
    <section className="py-12 bg-brand-gold/10 border-y border-brand-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">📢</span>
          <h2 className="text-2xl font-heading font-bold text-brand-dark">
            Actualites
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-brand-gold/20 hover:shadow-md transition-shadow"
            >
              {event.image && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-40 object-cover"
                  />
                </div>
              )}
              <h3 className="text-lg font-heading font-bold text-brand-dark mb-2">
                {event.title}
              </h3>
              <p className="text-stone-600 text-sm">{event.description}</p>
              {event.date && (
                <p className="text-xs text-brand-gold font-semibold mt-3">
                  📅 {event.date}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
