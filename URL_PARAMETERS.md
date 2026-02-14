# 💝 Paramètres URL personnalisables

Cette application de demande en Saint-Valentin supporte plusieurs paramètres URL pour personnaliser l'expérience.

## 📝 Paramètres disponibles

### `gf` - Girlfriend (Nom de la personne à qui tu demandes)
Le nom de la personne à qui tu fais la demande. Apparaît dans la question initiale et le message final.

**Exemple :**
```
http://localhost:8080/?gf=Marie
```
Affiche : "Marie, mon amour, Veux-tu être mon Valentine ? 💝"

### `bf` - Boyfriend (Ton nom - celui qui demande)
Ton nom qui apparaît à la fin du message d'amour sur la dernière étape.

**Exemple :**
```
http://localhost:8080/?bf=Thomas
```
Affiche à la fin : "- Thomas 💝"

### `idf` et `idh` (Anciens paramètres - toujours supportés)
- `idf` : Nom de la personne (féminin)
- `idh` : Nom dans le message final (homme)

Ces paramètres sont toujours supportés pour la compatibilité.

## 🎯 Exemples complets

### Exemple 1 : Utilisation complète
```
http://localhost:8080/?gf=Sophie&bf=Antoine
```
- Question : "Sophie, mon amour, Veux-tu être mon Valentine ? 💝"
- Sous-titre : "De la part de Antoine 💕"
- Message final : "Je t'aime Sophie 💕 - Antoine 💝"

### Exemple 2 : Seulement le nom de la girlfriend
```
http://localhost:8080/?gf=Emma
```
- Question : "Emma, mon amour, Veux-tu être mon Valentine ? 💝"
- Message final : "Je t'aime Emma 💕"

### Exemple 3 : Seulement ton nom
```
http://localhost:8080/?bf=Lucas
```
- Question : "Mon amour, Veux-tu être mon Valentine ? 💝"
- Sous-titre : "De la part de Lucas 💕"
- Message final : "Je t'aime mon amour 💕 - Lucas 💝"

## 🔄 Ordre de priorité

Pour le nom de la girlfriend :
1. `gf` (nouveau paramètre)
2. `idf` (ancien paramètre, toujours supporté)
3. "Mon amour" (par défaut)

Pour le message final :
1. `gf` (nouveau paramètre)
2. `idh` (ancien paramètre)
3. "mon amour" (par défaut)

## 💡 Conseils

- Utilise `encodeURIComponent()` pour les noms avec des espaces ou caractères spéciaux
- Les paramètres sont sensibles à la casse
- Tu peux combiner tous les paramètres ensemble

### Exemple avec espaces et caractères spéciaux :
```javascript
const gfName = "Marie-Claire";
const bfName = "Jean-Paul";
const url = `http://localhost:8080/?gf=${encodeURIComponent(gfName)}&bf=${encodeURIComponent(bfName)}`;
// Résultat : http://localhost:8080/?gf=Marie-Claire&bf=Jean-Paul
```
