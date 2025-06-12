<script lang="ts">
  let { images = [] } = $props();

  let imageData: { src: string; width?: number; height?: number; aspectRatio: number }[] = $state([]);
  let gridDimensions = $state({ rowHeights: [0.5, 0.5], colWidths: [0.5, 0.5] });
  
  async function loadImageData() {
    if (images.length < 4) return;
    
    const promises = images.slice(0, 4).map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          resolve({
            src,
            width: img.naturalWidth,
            height: img.naturalHeight,
            aspectRatio: img.naturalWidth / img.naturalHeight
          });
        };
        img.onerror = () => resolve({ src, aspectRatio: 1 });
        img.src = src;
      });
    });
    
    imageData.splice(0, imageData.length, ...await Promise.all(promises) as { src: string; width: number; height: number; aspectRatio: number }[]);
    calculateGridDimensions();
  }
  
  function calculateGridDimensions() {
    if (imageData.length < 4) return;
    
    const topLeft = imageData[0];
    const topRight = imageData[1];
    const bottomLeft = imageData[2];
    const bottomRight = imageData[3];
    
    const topRowBalance = balanceAspectRatios(topLeft.aspectRatio, topRight.aspectRatio);
    const bottomRowBalance = balanceAspectRatios(bottomLeft.aspectRatio, bottomRight.aspectRatio);
    
    const leftColRatio = (topRowBalance.left + bottomRowBalance.left) / 2;
    const rightColRatio = (topRowBalance.right + bottomRowBalance.right) / 2;
    
    const leftColBalance = balanceAspectRatios(1/topLeft.aspectRatio, 1/bottomLeft.aspectRatio);
    const rightColBalance = balanceAspectRatios(1/topRight.aspectRatio, 1/bottomRight.aspectRatio);
    
    const topRowRatio = (leftColBalance.left + rightColBalance.left) / 2;
    const bottomRowRatio = (leftColBalance.right + rightColBalance.right) / 2;
    
    const totalCol = leftColRatio + rightColRatio;
    const totalRow = topRowRatio + bottomRowRatio;
    
    gridDimensions.colWidths = [leftColRatio / totalCol, rightColRatio / totalCol];
    gridDimensions.rowHeights = [topRowRatio / totalRow, bottomRowRatio / totalRow];
  }
  
  function balanceAspectRatios(ratio1: number, ratio2: number) {
    const totalRatio = ratio1 + ratio2;
    return {
      left: ratio1 / totalRatio,
      right: ratio2 / totalRatio
    };
  }
  
  function getGridStyles() {
    const { colWidths, rowHeights } = gridDimensions;
    
    return {
      container: `
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: ${colWidths[0] * 100}% ${colWidths[1] * 100}%;
        grid-template-rows: ${rowHeights[0] * 100}% ${rowHeights[1] * 100}%;
        gap: 0.5rem;
        box-sizing: border-box;
      `,
      topLeft: 'grid-column: 1; grid-row: 1;',
      topRight: 'grid-column: 2; grid-row: 1;',
      bottomLeft: 'grid-column: 1; grid-row: 2;',
      bottomRight: 'grid-column: 2; grid-row: 2;'
    };
  }
  
  let styles = $derived(getGridStyles());
  
  $effect(() => {
    if (images.length >= 4) {
      loadImageData();
    }
  });
</script>

<div class="photo-container">
  {#if images.length >= 4 && imageData.length >= 4}
    <div class="photo-grid" style={styles.container}>
      <div class="photo-item" style={styles.topLeft}>
        <img src={imageData[0].src} alt="Spot" loading="lazy" />
      </div>
      <div class="photo-item" style={styles.topRight}>
        <img src={imageData[1].src} alt="Spot" loading="lazy" />
      </div>
      <div class="photo-item" style={styles.bottomLeft}>
        <img src={imageData[2].src} alt="Spot" loading="lazy" />
      </div>
      <div class="photo-item" style={styles.bottomRight}>
        <img src={imageData[3].src} alt="Spot" loading="lazy" />
      </div>
    </div>
  {/if}
</div>

<style>
  .photo-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .photo-grid {
    overflow: visible;
    background: transparent;
    box-sizing: border-box;
  }
  
  .photo-item {
    position: relative;
    overflow: visible;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
  
  .photo-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease;
    border-radius: 1rem;
  }
  
  .photo-item:hover img {
    transform: scale(1.02);
  }
  
  .photo-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  .photo-item:hover::before {
    opacity: 1;
  }
</style>

