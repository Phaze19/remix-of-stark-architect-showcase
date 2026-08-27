import { ArrowRight } from "lucide-react";
import SmartLink from "@/components/SmartLink";

const GroupCompanies = () => {
  return (
    <section id="group" className="border-b border-border bg-foreground py-20 text-background md:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-rational-red">
                Our Group / Associated Companies
              </p>
              <div className="mt-4 h-0.5 w-12 bg-rational-red" />
              <h2 className="mt-6 text-4xl font-light leading-[1.05] tracking-tight text-background md:text-5xl">
                Stronger together.
                <br />
                <span className="text-rational-red">Expanding capabilities.</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-background/70">
                Our international trade and distribution capabilities are delivered through
                REL METALS TRADING LLC, UAE — the group&apos;s trading arm serving the Middle
                East, Africa and other emerging markets.
              </p>
            </div>

            <div className="border border-background/15 p-8 md:p-10">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center bg-rational-red">
                  <span className="font-display text-xl font-black tracking-tighter text-white">
                    R
                  </span>
                </span>
                <div className="leading-tight">
                  <p className="font-display text-lg font-black uppercase tracking-tight text-background">
                    REL Metals
                  </p>
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-rational-red">
                    Trading LLC
                  </p>
                </div>
              </div>

              <dl className="mt-8 grid gap-px border border-background/15 bg-background/15 sm:grid-cols-2">
                <div className="bg-foreground p-6">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-background/50">
                    Entity
                  </dt>
                  <dd className="mt-2 text-sm text-background">REL METALS TRADING LLC, UAE</dd>
                </div>
                <div className="bg-foreground p-6">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-background/50">
                    Role
                  </dt>
                  <dd className="mt-2 text-sm text-background">Global trade &amp; distribution hub</dd>
                </div>
              </dl>

              <SmartLink
                href="/contact"
                className="group mt-8 inline-flex w-fit items-center gap-3 border-2 border-background px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] text-background transition-colors duration-300 hover:border-rational-red hover:bg-rational-red hover:text-white"
              >
                Contact REL Metals Trading
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </SmartLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupCompanies;
