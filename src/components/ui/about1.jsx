import { Landmark, Users, BookOpen } from "lucide-react";

const About1 = () => {
  return (
    <section className="py-32 ml-5">
      <div className="container flex flex-col gap-28">
        <div className="flex flex-col gap-7">
          <h1 className="text-4xl font-semibold lg:text-7xl">
            Preserving History, Inspiring the Future
          </h1>
          <p className="max-w-xl text-lg">
            The Museo de San Jose Malaquing Tubig is dedicated to preserving the rich history and cultural heritage of our community. Through exhibitions, artifacts, and immersive experiences, we connect the past with the present.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <img
            src="https://shadcnblocks.com/images/block/placeholder-1.svg"
            alt="museum"
            className="size-full max-h-96 rounded-2xl object-cover"
          />
          <div className="flex flex-col justify-between gap-10 rounded-2xl bg-muted p-10">
            <p className="text-sm text-muted-foreground">OUR MISSION</p>
            <p className="text-lg font-medium">
              Our mission is to safeguard and celebrate the cultural legacy of San Jose Malaquing Tubig. We strive to educate, engage, and inspire visitors through carefully curated exhibits and programs that bring history to life.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:gap-20">
          <div className="max-w-xl">
            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
              Connecting Generations Through History
            </h2>
            <p className="text-muted-foreground">
              We are committed to preserving and sharing the stories that define our past. Here’s how we achieve this vision.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Landmark className="size-5" />
              </div>
              <h3 className="mt-2 mb-3 text-lg font-semibold">
                Preserving Heritage
              </h3>
              <p className="text-muted-foreground">
                We carefully restore and maintain artifacts, documents, and historical pieces to ensure their longevity for future generations.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Users className="size-5" />
              </div>
              <h3 className="mt-2 mb-3 text-lg font-semibold">
                Engaging the Community
              </h3>
              <p className="text-muted-foreground">
                Through educational programs, interactive exhibits, and special events, we bring history closer to the people.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <BookOpen className="size-5" />
              </div>
              <h3 className="mt-2 mb-3 text-lg font-semibold">
                Inspiring Learning
              </h3>
              <p className="text-muted-foreground">
                We provide a space where visitors of all ages can discover, explore, and develop a deeper appreciation for our cultural history.
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="mb-10 text-sm font-medium text-muted-foreground">
              GET INVOLVED
            </p>
            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
              Be Part of Our Story
            </h2>
          </div>
          <div>
            <img
              src="https://shadcnblocks.com/images/block/placeholder-1.svg"
              alt="museum volunteers"
              className="mb-6 max-h-36 w-full rounded-xl object-cover"
            />
            <p className="text-muted-foreground">
              Whether through donations, volunteering, or visiting our exhibits, you can help us preserve and share the history of San Jose Malaquing Tubig for generations to come.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About1 };