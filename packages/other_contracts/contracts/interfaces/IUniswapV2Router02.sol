pragma solidity >=0.6.2;

import './IUniswapV2Router01.sol';

interface IUniswapV2Router02 is IUniswapV2Router01 {
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountETH);
    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountETH);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable;
    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;

    function addLiquidityETH(
        bytes calldata args
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);

    function swapExactETHForTokens(bytes calldata args)
        external
        payable
        returns (uint[] memory amounts);

    function swapTokensForExactTokens(
        bytes calldata args
    ) external returns (uint[] memory amounts); 


    function swapExactTokensForTokens(
       bytes calldata args
    ) external returns (uint[] memory amounts);


    function swapTokensForExactETH(bytes calldata args)
        external
        returns (uint[] memory amounts);


    function swapExactTokensForETH(bytes calldata args)
        external
        returns (uint[] memory amounts);

    function swapETHForExactTokens(bytes calldata args)
        external
        payable
        returns (uint[] memory amounts);
}