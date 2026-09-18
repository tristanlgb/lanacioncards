import { ArrowDown, ArrowUpRight, TrendingUp } from 'lucide-react';

interface MarketWidgetProps {
  onViewEconomy: () => void;
}

export function MarketWidget({ onViewEconomy }: MarketWidgetProps) {
  return (
    <section className="market card dark">
      <div className="widget-title">
        <span className="round-icon">
          <TrendingUp size={18} />
        </span>
        <span>LA ECONOMÍA, AL DÍA</span>
      </div>
      <h2>El pulso del dólar</h2>
      <div className="quote">
        <span>
          Dólar oficial
          <strong>
            $1.060<span>,00</span>
          </strong>
        </span>
        <span className="change">
          <ArrowDown size={12} /> 0,2%
        </span>
      </div>
      <div className="quote">
        <span>
          Dólar blue
          <strong>
            $1.220<span>,00</span>
          </strong>
        </span>
        <span className="change">
          <ArrowDown size={12} /> 0,8%
        </span>
      </div>
      <div className="market-footer">
        <span>Valores de demostración</span>
        <button onClick={() => onViewEconomy()} aria-label="Ver economía">
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}
