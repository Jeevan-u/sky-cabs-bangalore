import React from "react";
import { Metadata } from "next";
import { DEMO_POSTS } from "@/data/posts";
import { PostDataType } from "@/data/types";
import Avatar from "@/shared/Avatar";
import Badge from "@/shared/Badge";
import ButtonPrimary from "@/shared/ButtonPrimary";
import SocialsList from "@/shared/SocialsList";
import Image from "next/image";
import travelhero2Image from "@/images/travelhero2.png";
import Link from "next/link";
import { Route } from "@/routers/types";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import { PhoneIcon, WhatsAppIcon, ArrowRightIcon } from "@/components/icons";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

function getPostFromSlug(slugArray?: string[]) {
  const slug = slugArray && slugArray.length > 0 ? slugArray[0] : "srisailam-guide";
  return (
    DEMO_POSTS.find(
      (p) =>
        p.id === slug ||
        p.id === `blog-${slug}` ||
        String(p.id).replace("blog-", "") === String(slug).replace("blog-", "")
    ) || DEMO_POSTS[0]
  );
}

export function generateStaticParams() {
  return DEMO_POSTS.map((p) => ({
    slug: [String(p.id).replace("blog-", "")],
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const post = getPostFromSlug(params.slug);
  const slug = params.slug && params.slug.length > 0 ? params.slug[0] : "srisailam-guide";

  return {
    title: `${post.title}`,
    description: post.desc,
    alternates: {
      canonical: `https://www.srisadhgurutoursandtravels.com/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | Sri Sadhguru Travels`,
      description: post.desc,
      url: `https://www.srisadhgurutoursandtravels.com/blog/${slug}`,
      images: [
        {
          url: typeof post.featuredImage === "string" ? post.featuredImage : "/images/srisailam-dam.jpg",
          alt: post.title,
        },
      ],
    },
  };
}

const Page = async (props: PageProps) => {
  const params = await props.params;
  const post = getPostFromSlug(params?.slug);

  const renderHeader = () => {
    return (
      <header className="container rounded-xl">
        <div className="max-w-screen-md mx-auto space-y-5">
          <Badge href="/blog" color="purple" name={post.categories?.[0]?.name || "Pilgrimage & Travel Guide"} />
          <h1
            className="text-neutral-900 font-bold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl"
            title={post.title}
          >
            {post.title}
          </h1>
          <span className="block text-base text-neutral-600 md:text-lg dark:text-neutral-300 pb-1 font-medium">
            {post.desc}
          </span>

          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex flex-col items-baseline sm:flex-row sm:justify-between">
            <div className="nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 text-sm leading-none flex-shrink-0">
              <Avatar
                containerClassName="flex-shrink-0"
                sizeClass="w-8 h-8 sm:h-11 sm:w-11"
              />
              <div className="ml-3">
                <div className="flex items-center">
                  <a className="block font-semibold" href="/about">
                    {post.author?.displayName || "Sri Rathan Kanna (Sri Sadhguru Travels)"}
                  </a>
                </div>
                <div className="text-xs mt-[6px]">
                  <span className="text-neutral-500 dark:text-neutral-400">
                    {post.date || "Nov 15, 2026"}
                  </span>
                  <span className="mx-2 font-semibold">·</span>
                  <span className="text-neutral-500 dark:text-neutral-400">
                    {post.readingTime || 5} min read
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <SocialsList />
            </div>
          </div>
        </div>
      </header>
    );
  };

  const renderContent = () => {
    return (
      <div
        id="single-entry-content"
        className="prose dark:prose-invert prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark leading-relaxed"
      >
        <p>
          Traveling by road across Telangana, Andhra Pradesh, and neighboring southern states offers some of the most
          rewarding cultural, spiritual, and scenic road trip experiences in India. However, successful highway journeys
          demand careful route planning, timely departure, verified vehicles, and skilled chauffeurs who understand local
          topography.
        </p>

        <h3>Key Highway Route & Travel Timings</h3>
        <p>
          When planning a road journey from Hyderabad (including central hubs like Kukatpally, KPHB Colony, Miyapur, Hitec City,
          and Shamshabad Airport), connecting early to the Outer Ring Road (ORR) is essential to avoid city congestion.
        </p>
        <ul>
          <li>
            <strong>Early Departures:</strong> Commencing between 4:00 AM and 6:00 AM helps you clear city exits before peak hours
            and maximizes daytime darshan or sightseeing at your destination.
          </li>
          <li>
            <strong>Highway Safety & Ghat Roads:</strong> High-altitude temple routes (such as Srisailam, Tirupati Ghat, and
            Kondagattu) demand experienced drivers who maintain safe speeds and know optimal resting halts.
          </li>
          <li>
            <strong>Transparent Commercial Billing:</strong> Always ensure your transport operator uses commercial yellow-board
            registered vehicles with RTA tourist permits, Fastag clearance, and comprehensive passenger insurance.
          </li>
        </ul>

        <h3>Recommended Vehicles for Group & Family Travel</h3>
        <p>
          Selecting the appropriate commercial vehicle ensures that every family member travels in complete comfort:
        </p>
        <ul>
          <li>
            <strong>4 to 5 Passengers:</strong> AC Sedans (Maruti Swift Dzire, Toyota Etios) offer fuel-efficient and agile travel
            for airport runs and compact outstation trips.
          </li>
          <li>
            <strong>6 to 7 Passengers:</strong> Maruti Ertiga or Toyota Innova Crysta provides plush captain recliners, ample boot
            space for baggage, and dual AC blowers.
          </li>
          <li>
            <strong>12 to 26 Passengers:</strong> Force Tempo Travellers and luxury Force Urbanias offer pushback seating,
            generous aisle space, and surround audio/video entertainment for joint families and pilgrim groups.
          </li>
          <li>
            <strong>32 to 50 Passengers:</strong> Full-size AC luxury tourist coaches deliver seamless transport for grand wedding
            parties and corporate conventions.
          </li>
        </ul>

        <blockquote>
          <p>
            &ldquo;Travel Safe... Travel Happy... Your Journey, Our Responsibility. Sri Sadhguru Tours & Travels provides 24x7 verified
            cabs, spotless vehicles, and transparent flat or per-km pricing with zero hidden surcharges.&rdquo;
          </p>
        </blockquote>

        <h3>Essential Checklist Before You Depart</h3>
        <p>
          Before setting out on your outstation trip, verify that:
        </p>
        <ol>
          <li>Temple darshan slots, special entry tickets, and VIP passes are booked in advance.</li>
          <li>Your vehicle is sanitized, equipped with functional AC, and carries a spare tire and emergency tool kit.</li>
          <li>Your driver is well-rested, familiar with the route, and equipped with GPS navigation.</li>
          <li>Toll passes and state boundary road tax permits are in order.</li>
        </ol>

        <div className="my-8 p-6 bg-amber-50 dark:bg-amber-950/30 rounded-3xl border border-amber-200 dark:border-amber-800/40 not-prose">
          <h4 className="text-lg font-black text-amber-900 dark:text-amber-200">
            Need Doorstep Cab or Bus Booking in Hyderabad?
          </h4>
          <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300/90 mt-1">
            Sri Sadhguru Tours & Travels provides 24x7 doorstep dispatch from Kukatpally, KPHB, Miyapur, Hitec City, and Medchal.
            Call our dispatch desk directly or message us on WhatsApp for an instant fixed quote.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <a
              href={`tel:${SADHGURU_CONTACT.primaryPhone}`}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow transition inline-flex items-center gap-1.5"
            >
              <PhoneIcon className="w-3.5 h-3.5" />
              <span>Call: {SADHGURU_CONTACT.primaryPhoneFormatted}</span>
            </a>
            <a
              href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20am%20inquiring%20about%20${encodeURIComponent(post.title)}.`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition inline-flex items-center gap-1.5"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp Booking</span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  const renderTags = () => {
    const tags = [
      "Pilgrimage Tours",
      "Hyderabad Cabs",
      "Kukatpally Travels",
      "Shamshabad Airport Taxi",
      "Innova Crysta Rental",
      "Tempo Traveller",
    ];

    return (
      <div className="max-w-screen-md mx-auto flex flex-wrap gap-2 pt-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 font-semibold"
          >
            #{tag}
          </span>
        ))}
      </div>
    );
  };

  const renderAuthor = () => {
    return (
      <div className="max-w-screen-md mx-auto">
        <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <Avatar sizeClass="w-16 h-16 sm:w-20 sm:h-20" />
          <div className="flex flex-col space-y-1">
            <span className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider">
              AUTHOR & FLEET OPERATOR
            </span>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
              Sri Rathan Kanna
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
              Proprietor & Founder of Sri Sadhguru Tours & Travels. Overseeing 50+ commercial vehicles across Kukatpally,
              Hyderabad, and Gandhari (Kamareddy). Dedicated to safe highway travel, zero-surge pricing, and transparent passenger logistics.
            </p>
            <div className="pt-2">
              <Link href="/about" className="text-xs text-primary-6000 dark:text-primary-400 font-bold hover:underline inline-flex items-center gap-1">
                <span>View Company Profile & Fleet Operator Details</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPostRelated = (p: PostDataType) => {
    return (
      <div
        key={p.id}
        className="relative aspect-w-3 aspect-h-4 rounded-3xl overflow-hidden group border border-neutral-200 dark:border-neutral-700"
      >
        <Link href={p.href as Route} className="absolute inset-0 z-10" />
        <Image
          className="object-cover transform group-hover:scale-105 transition-transform duration-300"
          src={p.featuredImage}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          alt={p.title}
        />
        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black"></div>
        <div className="absolute inset-0 flex flex-col justify-end items-start text-xs text-neutral-300 space-y-2 p-4">
          <Badge name={p.categories?.[0]?.name || "Travel Guide"} />
          <h3 className="block text-sm sm:text-base font-bold text-white line-clamp-2">
            {p.title}
          </h3>
          <div className="flex text-[11px] text-neutral-300">
            <span>{p.date}</span>
            <span className="mx-1.5">·</span>
            <span>{p.readingTime} min read</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="nc-PageSingle pt-8 lg:pt-16 pb-20">
      {renderHeader()}
      <div className="container my-10 sm:my-12 max-w-screen-md mx-auto">
        <div className="relative aspect-w-16 aspect-h-9 rounded-3xl overflow-hidden shadow-xl border border-neutral-200 dark:border-neutral-700">
          <Image
            className="object-cover"
            src={typeof post.featuredImage === "string" ? post.featuredImage : travelhero2Image}
            alt={post.title}
            fill
            priority
          />
        </div>
      </div>

      <div className="nc-SingleContent container space-y-10">
        {renderContent()}
        {renderTags()}
        <div className="max-w-screen-md mx-auto border-b border-neutral-200 dark:border-neutral-700"></div>
        {renderAuthor()}
      </div>

      <div className="relative bg-neutral-100 dark:bg-neutral-800 py-16 lg:py-24 mt-16 lg:mt-24">
        <div className="container">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
              Related Travel & Road Trip Guides
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Browse additional temple itineraries and cab service advisories.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {DEMO_POSTS.filter((p) => p.id !== post.id).slice(0, 4).map(renderPostRelated)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
