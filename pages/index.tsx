import { Inter } from "next/font/google";
import Image from "next/image";
import useSWR from "swr";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { data, error, isLoading } = useSWR('https://pokeapi.co/api/v2/pokemon?limit=151', fetcher)
 
  if (error) return <div>failed to load pokémon list</div>
  if (isLoading) return <div>loading pokémon list...</div>

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-8 lg:p-24 bg-zinc-800 text-white ${inter.className}`}>

      <h1 className="text-4xl font-bold mb-16">Pokemón List</h1>

      <div className="flex flex-wrap items-center justify-center w-full gap-x-6 gap-y-8">

        {data?.results?.map((pokemon: any, index: number) => (
          <Popover key={pokemon.name}>
            <div className="w-full lg:w-1/4">
              <PopoverTrigger>
                <h2 className="capitalize text-2xl font-bold">{pokemon.name}</h2>

                <div className="flex items-center gap-5">
                  <div className="text-6xl">#{index + 1}</div>

                  <Image 
                    src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${index + 1}.svg`} 
                    alt={pokemon.name} 
                    width={170} 
                    height={170}
                    quality={50}
                    className="aspect-square"
                  />
                </div>
                
              </PopoverTrigger>

              <PopoverContent>Place content for the popover here.</PopoverContent>
            </div>
          </Popover>
        ))}

      </div>
    </main>
  );
}
