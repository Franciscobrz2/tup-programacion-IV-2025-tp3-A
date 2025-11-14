export const limpiarValues = (value) => {
    let limpio = value.trim()
    while(limpio.includes("  ")){
        limpio = limpio.replace("  ", " ")
    }
    return limpio
}