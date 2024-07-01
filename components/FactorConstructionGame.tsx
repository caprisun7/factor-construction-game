import React, { useState, Fragment } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];

interface ConstructedNumber {
  number: number;
  primes: number[];
}

interface ConstructedNumbers {
  [key: string]: ConstructedNumber[];
}

export const FactorConstructionGame: React.FC = () => {
  const [selectedPrimes, setSelectedPrimes] = useState<number[]>([]);
  const [constructedNumbers, setConstructedNumbers] = useState<ConstructedNumbers>({
    3: [], 4: [], 5: [], 6: [], 7: [], 8: []
  });
  const [currentTab, setCurrentTab] = useState<string>("3");
  const [message, setMessage] = useState<string>("");

  const calculateFactors = (num: number): number => {
    let factors = 0;
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) factors++;
    }
    return factors;
  };

  const handlePrimeClick = (prime: number): void => {
    setSelectedPrimes([...selectedPrimes, prime]);
  };

  const handlePrimeRemove = (index: number): void => {
    const newSelectedPrimes = [...selectedPrimes];
    newSelectedPrimes.splice(index, 1);
    setSelectedPrimes(newSelectedPrimes);
  };

  const handleSubmit = (): void => {
    const product = selectedPrimes.reduce((a, b) => a * b, 1);
    const factorCount = calculateFactors(product);
    
    if (factorCount === parseInt(currentTab)) {
      if (constructedNumbers[currentTab].some(item => item.number === product)) {
        setMessage(`You've already constructed ${product}. Try a different combination!`);
      } else {
        setConstructedNumbers({
          ...constructedNumbers,
          [currentTab]: [...constructedNumbers[currentTab], {
            number: product,
            primes: [...selectedPrimes]
          }]
        });
        setMessage(`Correct! ${product} has ${factorCount} factors.`);
      }  
    } else {
      setMessage(`Incorrect. ${product} does not have ${currentTab} factors. Try again!`);
    }
    
    setSelectedPrimes([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Factor Construction Game</h1>
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList>
          {[3, 4, 5, 6, 7, 8].map(num => (
            <TabsTrigger key={num} value={num.toString()}>{num} Factors</TabsTrigger>
          ))}
        </TabsList>
        {[3, 4, 5, 6, 7, 8].map(num => (
          <TabsContent key={num} value={num.toString()}>
            <h2 className="text-xl font-semibold mb-2">Construct numbers with {num} factors</h2>
            <div className="mb-4">
              {primes.map(prime => (
                <Button
                  key={prime}
                  onClick={() => handlePrimeClick(prime)}
                  variant="outline"
                  className="m-1"
                >
                  {prime}
                </Button>
              ))}
            </div>
            <div className="mb-4 flex flex-wrap items-center">
              {selectedPrimes.map((prime, index) => (
                <Fragment key={index}>
                  {index > 0 && <span className="mx-2">×</span>}
                  <Button
                    variant="default"
                    className="m-1"
                    onClick={() => handlePrimeRemove(index)}
                  >
                    {prime}
                  </Button>
                </Fragment>
              ))}
            </div>
            <div className="mb-4">
              Result: {selectedPrimes.reduce((a, b) => a * b, 1)}
            </div>
            <Button onClick={handleSubmit}>Submit</Button>
            {message && (
              <Alert className="mt-4">
                <AlertTitle>Result</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
            <h3 className="text-lg font-semibold mt-4">Constructed Numbers:</h3>
            <ul>
              {constructedNumbers[num].map((item, index) => (
                <li key={index}>{item.number} ({item.primes.join(' × ')})</li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};