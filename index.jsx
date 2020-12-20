const PRODUCTS = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"},
];

const ProductRow = React.memo(({product}) => {
  const name = product.stocked ? product.name : <span className="text-danger">{product.name}</span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
});

const ProductCategoryRow = ({category}) => {
    return (
      <tr>
        <th colSpan={2}>{category}</th>
      </tr>
    );
};

class SearchBar extends React.Component {
  constructor() {
    super();
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  handleInStockChange(e) {
    this.props.onStockChange(e.target.checked);
  }

  render() {
    const {filterText, inStockOnly} = this.props;
    return ( 
      <React.Fragment>
        <div className="form-group mb-3">
          <input type="text" value={filterText} onChange={this.handleFilterTextChange} className="form-control" placeholder="rechercher" />
        </div>
        <div className="form-check my-3">
          <input type="checkbox" checked={inStockOnly} onChange={this.handleInStockChange} className="form-check-input" id="stock" />
          <label htmlFor="stock" className="form-check-label">Produit en stock seulement</label>
        </div>
      </React.Fragment>
    );
  }
}

const ProductTable = ({products, inStockOnly, filterText}) => {
  const rows = [];
  let lastCategory = null;

  products.forEach(product => {
    if (inStockOnly && !product.stocked || product.name.indexOf(filterText) === -1)
    {
      return null;
    }
    if (product.category !== lastCategory) {
      lastCategory = product.category;
      rows.push(<ProductCategoryRow key={lastCategory} category={lastCategory} />);
    }
    rows.push(<ProductRow key={product.name} product={product} />)
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prix</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

class FilterableProductTable extends React.Component {
  constructor() {
    super();
    this.state = {
      filterText: '',
      inStockOnly: false
    }
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }
  handleFilterTextChange(filterText) {
    this.setState({filterText});
  }
  handleInStockChange(inStockOnly) {
    this.setState({inStockOnly});
  }

  render() {
    console.log('render');
    const {products} = this.props;
    return (
      <React.Fragment>
        <h1 className="display-4">Rechercher un produit</h1>
        <pre className="text-info">
          {JSON.stringify(this.state)}
        </pre>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onStockChange={this.handleInStockChange} />
        <ProductTable
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          products={products} />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<FilterableProductTable products={PRODUCTS} />, document.querySelector('#app'));
