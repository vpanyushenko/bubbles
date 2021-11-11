<script>
  import * as Pancake from "@sveltejs/pancake";

  export let color = "primary";

  const stroke = `stroke: var(--${color})`;

  const points = [
    { myX: 1979, myY: 7.19 },
    { myX: 1980, myY: 7.83 },
    { myX: 1981, myY: 7.24 },
    { myX: 1982, myY: 7.44 },
    { myX: 1983, myY: 7.51 },
    { myX: 1984, myY: 7.1 },
    { myX: 1985, myY: 6.91 },
    { myX: 1986, myY: 7.53 },
    { myX: 1987, myY: 7.47 },
    { myX: 1988, myY: 7.48 },
    { myX: 1989, myY: 7.03 },
    { myX: 1990, myY: 6.23 },
    { myX: 1991, myY: 6.54 },
    { myX: 1992, myY: 7.54 },
    { myX: 1993, myY: 6.5 },
    { myX: 1994, myY: 7.18 },
    { myX: 1995, myY: 6.12 },
    { myX: 1996, myY: 7.87 },
    { myX: 1997, myY: 6.73 },
    { myX: 1998, myY: 6.55 },
    { myX: 1999, myY: 6.23 },
    { myX: 2000, myY: 6.31 },
    { myX: 2001, myY: 6.74 },
    { myX: 2002, myY: 5.95 },
    { myX: 2003, myY: 6.13 },
    { myX: 2004, myY: 6.04 },
    { myX: 2005, myY: 5.56 },
    { myX: 2006, myY: 5.91 },
    { myX: 2007, myY: 4.29 },
    { myX: 2008, myY: 4.72 },
    { myX: 2009, myY: 5.38 },
    { myX: 2010, myY: 4.92 },
    { myX: 2011, myY: 4.61 },
    { myX: 2012, myY: 3.62 },
    { myX: 2013, myY: 5.35 },
    { myX: 2014, myY: 5.28 },
    { myX: 2015, myY: 4.63 },
    { myX: 2016, myY: 4.72 },
  ];
</script>

<div class="chart">
  <Pancake.Chart x1={1979} x2={2016} y1={0} y2={8}>
    <Pancake.Grid horizontal count={5} let:value let:first>
      <div class="grid-line horizontal" class:first><span>{value}</span></div>
    </Pancake.Grid>

    <Pancake.Grid vertical count={10} let:value>
      <div class="grid-line vertical" />
      <span class="year-label">{value}</span>
    </Pancake.Grid>

    <Pancake.Svg>
      <!-- <Pancake.SvgLine data={points} x={(d) => d.myX} y={(d) => d.myY} let:d>
        <path class="data" style={stroke} {d} />
      </Pancake.SvgLine> -->

      <Pancake.SvgArea data={points} x={(d) => d.myX} y={(d) => d.myY} let:d>
        <path class="data" style={stroke} {d} />
      </Pancake.SvgArea>

      <Pancake.Quadtree data={points} x={(d) => d.myX} y={(d) => d.myY} let:closest>
        {#if closest}
          <Pancake.SvgPoint x={closest.myX} y={closest.myY} let:d>
            <path class="highlight" style={stroke} {d} />
          </Pancake.SvgPoint>
        {/if}
      </Pancake.Quadtree>
    </Pancake.Svg>
  </Pancake.Chart>
</div>

<style>
  .chart {
    height: 200px;
    padding: 3rem 0 2rem 2rem;
    /* margin: 0 0 36px 0; */
  }

  .grid-line {
    position: relative;
    display: block;
  }

  .grid-line.horizontal {
    width: calc(100% + 2rem);
    left: -2em;
    border-bottom: 1px dashed var(--gray-light);
  }

  .grid-line.vertical {
    height: 100%;
    border-left: 1px dashed var(--gray-light);
  }

  .grid-line.first {
    border-bottom: 1px solid var(--gray);
  }

  .grid-line span {
    position: absolute;
    left: 0;
    bottom: 2px;
    font-size: 14px;
    color: #999;
  }

  .year-label {
    position: absolute;
    width: 4em;
    left: -2em;
    bottom: -22px;
    font-size: 14px;
    color: #999;
    text-align: center;
  }

  path.data {
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 6px;
    fill: none;
  }

  path.highlight {
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 10px;
    fill: none;
  }
</style>
