"use client";

import {
  Box,
  Heading,
  Text,
  Stack,
  Table,
  Separator,
  SimpleGrid,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { Clock, Users, Star, Fire } from "@phosphor-icons/react";

interface RecipeDetailCardProps {
  recipe: any;
}

// Umfangreiche Übersetzungsfunktion für englische Begriffe
const translateText = (text: string): string => {
  if (!text) return "";
  
  let result = text;
  
  // Zuerst Fahrenheit in Celsius umrechnen
  // Matches: 350°F, 350 °F, 350 degrees F, 350 F, etc.
  result = result.replace(/(\d+)\s*°?\s*(?:degrees?\s*)?F(?:ahrenheit)?/gi, (match, fahrenheit) => {
    const f = parseInt(fahrenheit);
    const celsius = Math.round((f - 32) * 5 / 9);
    return `${celsius}°C`;
  });
  
  const translations: Record<string, string> = {
    // Zutaten & Lebensmittel
    "chicken": "Hähnchen", "chicken breast": "Hähnchenbrust", "chicken thigh": "Hähnchenkeule",
    "beef": "Rind", "ground beef": "Rinderhackfleisch", "pork": "Schwein", "fish": "Fisch",
    "salmon": "Lachs", "tuna": "Thunfisch", "shrimp": "Garnelen", "lamb": "Lamm",
    "turkey": "Pute", "duck": "Ente", "bacon": "Speck", "ham": "Schinken",
    "sausage": "Wurst", "meat": "Fleisch", "steak": "Steak",
    "egg": "Ei", "eggs": "Eier", "egg white": "Eiweiß", "egg yolk": "Eigelb",
    "milk": "Milch", "whole milk": "Vollmilch", "skim milk": "Magermilch",
    "butter": "Butter", "cheese": "Käse", "cream": "Sahne", "sour cream": "Sauerrahm",
    "yogurt": "Joghurt", "cream cheese": "Frischkäse", "parmesan": "Parmesan",
    "flour": "Mehl", "all-purpose flour": "Allzweckmehl", "wheat flour": "Weizenmehl",
    "sugar": "Zucker", "brown sugar": "brauner Zucker", "powdered sugar": "Puderzucker",
    "salt": "Salz", "pepper": "Pfeffer", "black pepper": "schwarzer Pfeffer",
    "oil": "Öl", "olive oil": "Olivenöl", "vegetable oil": "Pflanzenöl", "coconut oil": "Kokosöl",
    "vinegar": "Essig", "balsamic vinegar": "Balsamico-Essig", "wine vinegar": "Weinessig",
    "garlic": "Knoblauch", "garlic clove": "Knoblauchzehe", "garlic cloves": "Knoblauchzehen",
    "onion": "Zwiebel", "onions": "Zwiebeln", "red onion": "rote Zwiebel", "green onion": "Frühlingszwiebel",
    "tomato": "Tomate", "tomatoes": "Tomaten", "cherry tomatoes": "Kirschtomaten", "tomato sauce": "Tomatensauce",
    "potato": "Kartoffel", "potatoes": "Kartoffeln", "sweet potato": "Süßkartoffel",
    "carrot": "Karotte", "carrots": "Karotten", "broccoli": "Brokkoli", "cauliflower": "Blumenkohl",
    "spinach": "Spinat", "lettuce": "Blattsalat", "cucumber": "Gurke", "celery": "Sellerie",
    "mushroom": "Pilz", "mushrooms": "Pilze", "bell pepper": "Paprika", "red pepper": "rote Paprika",
    "zucchini": "Zucchini", "eggplant": "Aubergine", "asparagus": "Spargel", "cabbage": "Kohl",
    "lemon": "Zitrone", "lemon juice": "Zitronensaft", "lime": "Limette", "lime juice": "Limettensaft",
    "orange": "Orange", "apple": "Apfel", "banana": "Banane", "berries": "Beeren",
    "honey": "Honig", "maple syrup": "Ahornsirup", "vanilla": "Vanille", "cinnamon": "Zimt",
    "rice": "Reis", "white rice": "weißer Reis", "brown rice": "Vollkornreis",
    "pasta": "Nudeln", "spaghetti": "Spaghetti", "noodles": "Nudeln", "bread": "Brot",
    "breadcrumbs": "Semmelbrösel", "bread crumbs": "Semmelbrösel",
    "beans": "Bohnen", "black beans": "schwarze Bohnen", "kidney beans": "Kidneybohnen",
    "peas": "Erbsen", "corn": "Mais", "chickpeas": "Kichererbsen", "lentils": "Linsen",
    "basil": "Basilikum", "parsley": "Petersilie", "cilantro": "Koriander", "oregano": "Oregano",
    "thyme": "Thymian", "rosemary": "Rosmarin", "dill": "Dill", "bay leaf": "Lorbeerblatt",
    "cumin": "Kreuzkümmel", "paprika": "Paprikapulver", "chili": "Chili", "ginger": "Ingwer",
    "soy sauce": "Sojasauce", "worcestershire sauce": "Worcestersauce", "hot sauce": "scharfe Sauce",
    "mayonnaise": "Mayonnaise", "mustard": "Senf", "ketchup": "Ketchup",
    "broth": "Brühe", "chicken broth": "Hühnerbrühe", "beef broth": "Rinderbrühe", "stock": "Fond",
    "water": "Wasser", "wine": "Wein", "white wine": "Weißwein", "red wine": "Rotwein",
    "nuts": "Nüsse", "almonds": "Mandeln", "walnuts": "Walnüsse", "peanuts": "Erdnüsse",
    
    // Zubereitungsarten & Verben
    "baked": "gebacken", "bake": "backen", "grilled": "gegrillt", "grill": "grillen",
    "fried": "gebraten", "fry": "braten", "deep-fried": "frittiert", "pan-fried": "in der Pfanne gebraten",
    "roasted": "geröstet", "roast": "rösten", "steamed": "gedämpft", "steam": "dämpfen",
    "boiled": "gekocht", "boil": "kochen", "simmered": "geköchelt", "simmer": "köcheln lassen",
    "sauteed": "angebraten", "saute": "anbraten", "sauté": "anbraten",
    "stir-fried": "pfannengerührt", "stir-fry": "im Wok braten", "stir fry": "im Wok braten",
    "chopped": "gehackt", "chop": "hacken", "finely chopped": "fein gehackt",
    "sliced": "in Scheiben geschnitten", "slice": "in Scheiben schneiden", "thinly sliced": "dünn geschnitten",
    "diced": "gewürfelt", "dice": "würfeln", "cubed": "in Würfel geschnitten",
    "minced": "fein gehackt", "mince": "fein hacken", "crushed": "zerdrückt", "crush": "zerdrücken",
    "grated": "gerieben", "grate": "reiben", "shredded": "geraspelt", "shred": "raspeln",
    "peeled": "geschält", "peel": "schälen", "cored": "entkernt",
    "mixed": "gemischt", "mix": "mischen", "stirred": "gerührt", "stir": "rühren",
    "whisked": "verquirlt", "whisk": "verquirlen", "beaten": "geschlagen", "beat": "schlagen",
    "melted": "geschmolzen", "melt": "schmelzen", "softened": "weich",
    "marinated": "mariniert", "marinate": "marinieren",
    
    // Kochanweisungen
    "preheat": "Vorheizen", "preheated": "vorgeheizt",
    "oven": "Ofen", "microwave": "Mikrowelle", "stovetop": "Herd",
    "pan": "Pfanne", "skillet": "Bratpfanne", "pot": "Topf", "saucepan": "Kochtopf",
    "baking sheet": "Backblech", "baking dish": "Auflaufform", "casserole dish": "Auflaufform",
    "bowl": "Schüssel", "mixing bowl": "Rührschüssel", "large bowl": "große Schüssel",
    "plate": "Teller", "serving plate": "Servierteller",
    "heat": "erhitzen", "cook": "kochen", "cook until": "kochen bis",
    "add": "hinzufügen", "then add": "dann hinzufügen",
    "combine": "vermengen", "mix together": "zusammenmischen",
    "pour": "gießen", "pour over": "übergießen", "pour into": "hineingießen",
    "place": "legen", "put": "legen", "set aside": "beiseite stellen",
    "transfer": "umfüllen", "transfer to": "umfüllen in",
    "serve": "servieren", "serve with": "servieren mit", "serve immediately": "sofort servieren",
    "garnish": "garnieren", "garnish with": "garnieren mit",
    "season": "würzen", "season with": "würzen mit", "season to taste": "nach Geschmack würzen",
    "sprinkle": "bestreuen", "sprinkle with": "bestreuen mit",
    "cover": "abdecken", "cover with": "abdecken mit", "uncover": "aufdecken",
    "remove": "entfernen", "remove from": "entfernen von", "remove from heat": "vom Herd nehmen",
    "drain": "abtropfen", "drain well": "gut abtropfen lassen",
    "cool": "abkühlen", "let cool": "abkühlen lassen", "cool completely": "vollständig abkühlen lassen",
    "refrigerate": "kühlen", "chill": "kalt stellen", "freeze": "einfrieren",
    "bring to a boil": "zum Kochen bringen", "reduce heat": "Hitze reduzieren",
    "turn": "wenden", "flip": "umdrehen", "toss": "schwenken",
    "coat": "bestreichen", "brush": "einpinseln", "brush with": "einpinseln mit",
    "layer": "schichten", "spread": "verteilen", "spread evenly": "gleichmäßig verteilen",
    "cut": "schneiden", "cut into": "schneiden in",
    
    // Zeitangaben
    "minutes": "Minuten", "minute": "Minute", "mins": "Min.",
    "hours": "Stunden", "hour": "Stunde", "hrs": "Std.",
    "seconds": "Sekunden", "second": "Sekunde",
    "overnight": "über Nacht",
    
    // Mengenangaben
    "pound": "Pfund", "pounds": "Pfund", "lb": "Pfund", "lbs": "Pfund",
    "ounce": "Unze", "ounces": "Unzen", "oz": "Unzen",
    "cup": "Tasse", "cups": "Tassen",
    "tablespoon": "EL", "tablespoons": "EL", "tbsp": "EL",
    "teaspoon": "TL", "teaspoons": "TL", "tsp": "TL",
    "pinch": "Prise", "pinch of": "Prise",
    "clove": "Zehe", "cloves": "Zehen",
    "piece": "Stück", "pieces": "Stücke",
    "bunch": "Bund", "head": "Kopf", "stalk": "Stange", "stalks": "Stangen",
    "handful": "Handvoll", "dash": "Spritzer",
    "small": "klein", "medium": "mittel", "large": "groß",
    "half": "halb", "quarter": "viertel", "third": "drittel",
    
    // Adjektive
    "fresh": "frisch", "freshly": "frisch", "dried": "getrocknet", "frozen": "tiefgefroren",
    "raw": "roh", "cooked": "gekocht", "uncooked": "ungekocht",
    "hot": "heiß", "cold": "kalt", "warm": "warm", "room temperature": "Zimmertemperatur",
    "crispy": "knusprig", "crunchy": "knackig", "tender": "zart", "soft": "weich",
    "creamy": "cremig", "smooth": "glatt", "thick": "dick", "thin": "dünn",
    "spicy": "scharf", "mild": "mild", "sweet": "süß", "sour": "sauer", "salty": "salzig",
    "savory": "herzhaft", "bitter": "bitter", "tangy": "würzig",
    "healthy": "gesund", "delicious": "lecker", "tasty": "schmackhaft",
    "light": "leicht", "rich": "reichhaltig", "flavorful": "aromatisch",
    "golden": "goldbraun", "golden brown": "goldbraun", "browned": "angebräunt",
    "optional": "optional", "to taste": "nach Geschmack",
    
    // Sonstiges
    "the": "", "a": "", "an": "",
    "and": "und", "or": "oder", "with": "mit", "without": "ohne",
    "into": "in", "onto": "auf", "over": "über", "under": "unter",
    "until": "bis", "while": "während", "when": "wenn",
    "about": "etwa", "approximately": "ungefähr", "around": "ca.",
    "if": "falls", "if needed": "falls nötig", "as needed": "nach Bedarf",
    "each": "jede/r/s", "both": "beide", "all": "alle",
    "well": "gut", "thoroughly": "gründlich", "evenly": "gleichmäßig",
    "gently": "vorsichtig", "carefully": "behutsam", "quickly": "schnell", "slowly": "langsam",
    "aside": "beiseite", "together": "zusammen", "separately": "getrennt",
  };
  
  // Sortiere nach Länge (längere zuerst), um "chicken breast" vor "chicken" zu ersetzen
  const sortedTranslations = Object.entries(translations).sort((a, b) => b[0].length - a[0].length);
  
  for (const [eng, de] of sortedTranslations) {
    const regex = new RegExp(`\\b${eng}\\b`, 'gi');
    result = result.replace(regex, de);
  }
  
  // Bereinige doppelte Leerzeichen und trimme
  return result.trim().replace(/\s+/g, ' ');
};

export const RecipeDetailCard = ({ recipe }: RecipeDetailCardProps) => {
  if (!recipe) return null;

  // Parse serving data
  const serving = recipe.serving_sizes?.serving || {};
  
  // Parse ingredients
  let ingredients: any[] = [];
  if (recipe.ingredients?.ingredient) {
    ingredients = Array.isArray(recipe.ingredients.ingredient)
      ? recipe.ingredients.ingredient
      : [recipe.ingredients.ingredient];
  }

  // Parse directions
  let directions: any[] = [];
  if (recipe.directions?.direction) {
    directions = Array.isArray(recipe.directions.direction)
      ? recipe.directions.direction
      : [recipe.directions.direction];
  }

  // Parse recipe types
  let recipeTypes: string[] = [];
  if (recipe.recipe_types?.recipe_type) {
    recipeTypes = Array.isArray(recipe.recipe_types.recipe_type)
      ? recipe.recipe_types.recipe_type
      : [recipe.recipe_types.recipe_type];
  }

  // Parse images
  let images: string[] = [];
  if (recipe.recipe_images?.recipe_image) {
    images = Array.isArray(recipe.recipe_images.recipe_image)
      ? recipe.recipe_images.recipe_image
      : [recipe.recipe_images.recipe_image];
  }

  // Helper functions
  const getVal = (val: any) => (val ? parseFloat(val) : 0);
  const formatVal = (val: any, unit: string = "g") => `${getVal(val).toLocaleString("de-DE")} ${unit}`;

  // Bestimme das Icon basierend auf Rezeptinhalt
  const recipeText = `${recipe.recipe_name} ${recipe.recipe_description}`.toLowerCase();
  const getRecipeIcon = () => {
    if (recipeText.includes("chicken") || recipeText.includes("hähnchen")) return "🐔";
    if (recipeText.includes("beef") || recipeText.includes("rind") || recipeText.includes("steak")) return "🐄";
    if (recipeText.includes("pork") || recipeText.includes("schwein")) return "🐷";
    if (recipeText.includes("fish") || recipeText.includes("salmon") || recipeText.includes("fisch")) return "🐟";
    if (recipeText.includes("shrimp") || recipeText.includes("seafood")) return "🦐";
    if (recipeText.includes("vegan")) return "🌱";
    if (recipeText.includes("vegetarian") || recipeText.includes("veggie")) return "🥬";
    if (recipeText.includes("salad") || recipeText.includes("salat")) return "🥗";
    if (recipeText.includes("soup") || recipeText.includes("suppe")) return "🍲";
    if (recipeText.includes("pasta") || recipeText.includes("spaghetti")) return "🍝";
    if (recipeText.includes("cake") || recipeText.includes("dessert")) return "🍰";
    return "🍽️";
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6} bg="white" boxShadow="sm">
      <Stack gap={6}>
        {/* Header */}
        <Box>
          <HStack gap={4} mb={3}>
            <Box fontSize="3xl" bg="gray.100" p={3} borderRadius="lg">
              {getRecipeIcon()}
            </Box>
            <Box flex={1}>
              <Heading size="lg" color="green.600" mb={1}>
                {translateText(recipe.recipe_name)}
              </Heading>
              <Text color="gray.600" fontSize="sm">
                {translateText(recipe.recipe_description)}
              </Text>
            </Box>
          </HStack>

          {/* Recipe Types */}
          {recipeTypes.length > 0 && (
            <HStack gap={2} flexWrap="wrap" mb={3}>
              {recipeTypes.map((type, i) => (
                <Badge key={i} colorPalette="green" variant="subtle">
                  {translateText(type)}
                </Badge>
              ))}
            </HStack>
          )}

          {/* Meta Info */}
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
            {recipe.preparation_time_min && (
              <HStack color="gray.600" fontSize="sm">
                <Clock size={18} />
                <Text>Vorbereitung: {recipe.preparation_time_min} Min.</Text>
              </HStack>
            )}
            {recipe.cooking_time_min && (
              <HStack color="gray.600" fontSize="sm">
                <Fire size={18} />
                <Text>Kochen: {recipe.cooking_time_min} Min.</Text>
              </HStack>
            )}
            {recipe.number_of_servings && (
              <HStack color="gray.600" fontSize="sm">
                <Users size={18} />
                <Text>{recipe.number_of_servings} Portionen</Text>
              </HStack>
            )}
            {recipe.rating && (
              <HStack color="yellow.500" fontSize="sm">
                <Star size={18} weight="fill" />
                <Text>{recipe.rating}/5 Sterne</Text>
              </HStack>
            )}
          </SimpleGrid>
        </Box>

        <Separator />

        {/* Nutrition per Serving */}
        <Box>
          <Heading size="sm" mb={4} color="gray.700">
            Nährwerte pro Portion
            {serving.serving_size && (
              <Text as="span" fontWeight="normal" fontSize="xs" ml={2} color="gray.500">
                ({serving.serving_size})
              </Text>
            )}
          </Heading>

          <SimpleGrid columns={{ base: 2, md: 4 }} gap={4} p={4} bg="gray.50" borderRadius="md">
            <VStack align="center">
              <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                {getVal(serving.calories).toFixed(0)}
              </Text>
              <Text fontSize="xs" color="gray.500" textTransform="uppercase">
                Kalorien (kcal)
              </Text>
            </VStack>
            <VStack align="center">
              <Text fontSize="xl" fontWeight="bold" color="green.600">
                {formatVal(serving.protein)}
              </Text>
              <Text fontSize="xs" color="gray.500" textTransform="uppercase">
                Protein
              </Text>
            </VStack>
            <VStack align="center">
              <Text fontSize="xl" fontWeight="bold" color="orange.600">
                {formatVal(serving.carbohydrate)}
              </Text>
              <Text fontSize="xs" color="gray.500" textTransform="uppercase">
                Kohlenhydrate
              </Text>
            </VStack>
            <VStack align="center">
              <Text fontSize="xl" fontWeight="bold" color="red.600">
                {formatVal(serving.fat)}
              </Text>
              <Text fontSize="xs" color="gray.500" textTransform="uppercase">
                Fett
              </Text>
            </VStack>
          </SimpleGrid>
        </Box>

        {/* Detailed Nutrition Table */}
        <Box>
          <Heading size="sm" mb={3} color="gray.700">
            Detaillierte Nährwerte
          </Heading>
          <Table.Root size="sm" variant="outline" striped>
            <Table.Body>
              <Table.Row>
                <Table.Cell fontWeight="bold">Energie</Table.Cell>
                <Table.Cell textAlign="right">{getVal(serving.calories)} kcal</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell fontWeight="bold">Fett</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(serving.fat)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell pl={8}>davon gesättigte Fettsäuren</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(serving.saturated_fat)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell fontWeight="bold">Kohlenhydrate</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(serving.carbohydrate)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell pl={8}>davon Zucker</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(serving.sugar)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell fontWeight="bold">Ballaststoffe</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(serving.fiber)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell fontWeight="bold">Eiweiß</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(serving.protein)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell fontWeight="bold">Natrium</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(serving.sodium, "mg")}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell fontWeight="bold">Cholesterin</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(serving.cholesterol, "mg")}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Box>

        <Separator />

        {/* Ingredients */}
        {ingredients.length > 0 && (
          <Box>
            <Heading size="sm" mb={4} color="gray.700">
              Zutaten ({ingredients.length})
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={2}>
              {ingredients.map((ing, i) => {
                // Parse Menge und Einheit
                const amount = ing.number_of_units ? parseFloat(ing.number_of_units) : null;
                const unit = ing.measurement_description || "";
                const foodName = ing.food_name || "";
                const fullDesc = ing.ingredient_description || "";
                
                // Formatiere die Anzeige
                const displayText = translateText(fullDesc || `${amount || ""} ${unit} ${foodName}`);
                
                return (
                  <Box 
                    key={i} 
                    p={3} 
                    bg="gray.50" 
                    borderRadius="md"
                    borderLeftWidth="3px"
                    borderLeftColor="green.400"
                    display="flex"
                    alignItems="center"
                    gap={3}
                  >
                    <Box 
                      bg="green.100" 
                      color="green.600" 
                      borderRadius="full" 
                      w="28px" 
                      h="28px" 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="center"
                      fontSize="xs"
                      fontWeight="bold"
                      flexShrink={0}
                    >
                      {i + 1}
                    </Box>
                    <Text fontSize="sm" color="gray.700">
                      {displayText}
                    </Text>
                  </Box>
                );
              })}
            </SimpleGrid>
          </Box>
        )}

        {/* Directions */}
        {directions.length > 0 && (
          <Box>
            <Heading size="sm" mb={3} color="gray.700">
              Zubereitung
            </Heading>
            <VStack align="stretch" gap={3}>
              {directions
                .sort((a, b) => parseInt(a.direction_number) - parseInt(b.direction_number))
                .map((dir, i) => (
                  <HStack key={i} align="start" gap={3}>
                    <Badge
                      colorPalette="green"
                      borderRadius="full"
                      minW="28px"
                      textAlign="center"
                    >
                      {dir.direction_number}
                    </Badge>
                    <Text fontSize="sm" color="gray.700">
                      {translateText(dir.direction_description)}
                    </Text>
                  </HStack>
                ))}
            </VStack>
          </Box>
        )}

        {/* Link to original recipe */}
        {recipe.recipe_url && (
          <Box pt={4}>
            <Text fontSize="xs" color="gray.400">
              <a href={recipe.recipe_url} target="_blank" rel="noopener noreferrer">
                Originalrezept auf FatSecret ansehen
              </a>
            </Text>
          </Box>
        )}
      </Stack>
    </Box>
  );
};
